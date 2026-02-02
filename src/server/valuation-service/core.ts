import * as cheerio from "cheerio";
import { Client } from "pg";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type PropertyType = "Haus" | "Wohnung" | "Grundstück" | "Gewerbe";
type ImmoscoutPropertyType = "HOUSE" | "APARTMENT";

export interface PriceResult {
	price: number | null;
	source:
		| "is_city_street"
		| "is_plz_street"
		| "is_plz_only"
		| "database"
		| "brw"
		| "brw_fallback"
		| "none";
	url?: string;
}

// ============================================================================
// PROPERTY ADDRESS
// ============================================================================

export class PropertyAddress {
	constructor(
		public readonly city: string,
		public readonly street: string,
		public readonly postalCode: string,
		public readonly propertyType: PropertyType,
		public readonly latitude?: number,
		public readonly longitude?: number,
		public readonly propertyTypeDetails?: string,
	) {}

	getImmoscoutType(): ImmoscoutPropertyType | null {
		return this.propertyType === "Haus"
			? "HOUSE"
			: this.propertyType === "Wohnung"
				? "APARTMENT"
				: null;
	}

	isImmoscoutSupported(): boolean {
		return this.getImmoscoutType() !== null;
	}

	isGrundstuck(): boolean {
		return this.propertyType === "Grundstück";
	}

	isGewerbe(): boolean {
		return this.propertyType === "Gewerbe";
	}

	needsBrwLookup(): boolean {
		return this.isGrundstuck() || this.isGewerbe();
	}

	hasCoordinates(): boolean {
		return this.latitude !== undefined && this.longitude !== undefined;
	}

	getLayerIds(): number[] {
		// Gewerbe always uses [0, 1]
		if (this.isGewerbe()) {
			return [0, 1];
		}

		// Grundstück uses different layer IDs based on subtype
		if (this.isGrundstuck()) {
			if (!this.propertyTypeDetails) {
				// Default: try all layer IDs if no subtype specified
				return [0, 1, 4, 5];
			}

			// Match exact values from the UI
			switch (this.propertyTypeDetails) {
				case "Bauland":
					return [0, 1];
				case "Ackerland":
					return [4];
				case "Wald-/Grünland":
					return [5];
				case "Sonstiges":
					// For "Sonstiges", try all layer IDs
					return [0, 1, 4, 5];
				default:
					// Fallback for any other values
					return [0, 1, 4, 5];
			}
		}

		return [];
	}

	private clean(text: string): string {
		return text.replace(/[[\](),]/g, "").trim();
	}

	private shorten(text: string, chars: number): string {
		return text.length <= chars ? text : text.slice(0, -chars);
	}

	buildCityStreetQuery(): string {
		return `${this.clean(this.city)} ${this.shorten(this.street, 2)}`;
	}

	buildPlzStreetQuery(): string {
		return `${this.postalCode} ${this.shorten(this.street, 2)}`;
	}

	buildPlzOnlyQuery(): string {
		return this.postalCode;
	}
}

// ============================================================================
// IMMOBILIENSCOUT CLIENT
// ============================================================================

class ImmoscoutClient {
	private readonly baseUrl = "https://atlas.immobilienscout24.de";
	private readonly brightDataUrl = "https://api.brightdata.com/request";
	private readonly apiKey: string;

	constructor(apiKey?: string) {
		this.apiKey = apiKey || process.env.BRIGHT_DATA_API_KEY?.trim() || "";
	}

	private async fetch(url: string): Promise<string> {
		const response = await fetch(this.brightDataUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`,
			},
			body: JSON.stringify({
				zone: "web_unlocker2",
				url,
				format: "raw",
			}),
		});

		if (!response.ok) {
			throw new Error(`Request failed: ${response.status}`);
		}

		return response.text();
	}

	async searchAddresses(
		query: string,
	): Promise<Array<{ url: string; address: { zipcode: string } }>> {
		try {
			const url = `${this.baseUrl}/suggestions?searchString=${encodeURIComponent(query)}`;
			const text = await this.fetch(url);
			const data = JSON.parse(text);
			return data.addresses || [];
		} catch (error) {
			console.error("[Immoscout] Search failed:", error);
			return [];
		}
	}

	async extractPrice(url: string): Promise<number | null> {
		try {
			const html = await this.fetch(url);
			const $ = cheerio.load(html);
			const priceText = $("span.PricePerMeter__pricePerMeterLarge")
				.first()
				.text();
			const price = parseInt(priceText.replace(/[€.\s]/g, ""), 10);
			return isNaN(price) ? null : price;
		} catch (error) {
			console.error("[Immoscout] Price extraction failed:", error);
			return null;
		}
	}

	buildPropertyUrl(baseUrl: string, type: ImmoscoutPropertyType): string {
		const focus = type === "HOUSE" ? "HOUSE_BUY" : "APARTMENT_BUY";
		return `${baseUrl}?marketingFocus=${focus}`;
	}
}

// ============================================================================
// DATABASE CLIENT
// ============================================================================

class DatabaseClient {
	private readonly config = {
		host: process.env.ENDPOINT || "",
		user: process.env.USERNAME || "",
		password: process.env.PASSWORD || "",
		database: process.env.DATABASE || "",
		port: 5432,
		ssl: { rejectUnauthorized: false },
	};

	private async query<T>(sql: string, params: any[]): Promise<T[]> {
		const client = new Client(this.config);
		try {
			await client.connect();
			const result = await client.query(sql, params);
			return result.rows;
		} finally {
			await client.end();
		}
	}

	async getAveragePrice(
		postalCode: string,
		propertyType: PropertyType,
	): Promise<number | null> {
		try {
			const rows = await this.query<{ avg_price: number }>(
				`SELECT (min_price + max_price) / 2 AS avg_price FROM leads.valuation_range
         WHERE postal_code = $1 AND property_type_clean = $2 LIMIT 1`,
				[postalCode, propertyType],
			);
			return rows.length > 0 ? Math.round(rows[0]!.avg_price) : null;
		} catch (error) {
			console.error("[Database] Query failed:", error);
			return null;
		}
	}

	async getBrwPrice(
		longitude: number,
		latitude: number,
		layerIds: number[],
	): Promise<number | null> {
		try {
			const rows = await this.query<{ brw: string }>(
				`SELECT
          layername,
          brw::float,
          gabe as gutachterausschuss,
          stag as stichtag,
          gema as gemarkung,
          LEFT(wgfz, 5) as gfz,
          grz as grz,
          gez as gez
        FROM brw_clean_live
        WHERE st_contains(
          geom::geometry,
          st_point($1, $2)::geography::geometry
        ) AND (
          layerid = ANY($3)
        )
        ORDER BY
          scraping_run DESC,
          brw::float DESC
        LIMIT 1`,
				[longitude, latitude, layerIds],
			);

			if (rows.length > 0 && rows[0]!.brw) {
				const brwValue = parseFloat(rows[0]!.brw);
				return isNaN(brwValue) ? null : Math.round(brwValue * 100) / 100;
			}

			return null;
		} catch (error) {
			console.error("[BRW Database] Query failed:", error);
			return null;
		}
	}
}

// ============================================================================
// PRICE STRATEGIES
// ============================================================================

interface StrategyResult {
	price: number | null;
	url?: string;
}

interface Strategy {
	name: string;
	canHandle: (addr: PropertyAddress) => boolean;
	execute: (addr: PropertyAddress) => Promise<StrategyResult>;
}

class StrategyExecutor {
	constructor(
		private immoscout: ImmoscoutClient,
		private database: DatabaseClient,
	) {}

	private createImmoscoutStrategy(
		name: string,
		queryBuilder: (addr: PropertyAddress) => string,
	): Strategy {
		return {
			name,
			canHandle: (addr) => addr.isImmoscoutSupported(),
			execute: async (addr) => {
				const query = queryBuilder(addr);
				const type = addr.getImmoscoutType();
				if (!type) return { price: null };

				console.log(`[${name}] Searching: "${query}"`);

				const addresses = await this.immoscout.searchAddresses(query);
				const match = addresses.find(
					(a) => a.address.zipcode === addr.postalCode,
				);

				if (!match) {
					console.log(`[${name}] No match found`);
					return { price: null };
				}

				const url = this.immoscout.buildPropertyUrl(match.url, type);
				const price = await this.immoscout.extractPrice(url);

				if (price) console.log(`[${name}] Success: €${price}`);
				return { price, url: price ? url : undefined };
			},
		};
	}

	private createDatabaseStrategy(): Strategy {
		return {
			name: "Database",
			canHandle: () => true,
			execute: async (addr) => {
				console.log(`[Database] Querying PLZ ${addr.postalCode}`);
				const price = await this.database.getAveragePrice(
					addr.postalCode,
					addr.propertyType,
				);
				if (price) console.log(`[Database] Success: €${price}`);
				return { price };
			},
		};
	}

	async execute(address: PropertyAddress): Promise<PriceResult> {
		console.log("\n" + "=".repeat(50));
		console.log(`Fetching price for: ${address.city}, ${address.street}`);
		console.log(`PLZ: ${address.postalCode} | Type: ${address.propertyType}`);
		console.log("=".repeat(50) + "\n");

		// Separate logic for Grundstück/Gewerbe - ONLY use BRW
		if (address.needsBrwLookup()) {
			return this.executeForLandOrCommercial(address);
		}

		// Logic for Haus/Wohnung - use Immoscout + Database cascade
		return this.executeForResidential(address);
	}

	private async executeForLandOrCommercial(
		address: PropertyAddress,
	): Promise<PriceResult> {
		console.log(
			`Property Type: ${address.propertyType} - Using BRW lookup only\n`,
		);

		if (!address.hasCoordinates()) {
			console.log("[BRW] No coordinates available - cannot fetch price\n");
			return { price: null, source: "none" };
		}

		const layerIds = address.getLayerIds();
		console.log(
			`[BRW] Querying coordinates (${address.latitude}, ${address.longitude})`,
		);
		console.log(
			`[BRW] Layer IDs: ${layerIds.join(", ")} | Type: ${address.propertyType} ${address.propertyTypeDetails ? `(${address.propertyTypeDetails})` : ""}`,
		);

		try {
			// First try with specific layer IDs
			const price = await this.database.getBrwPrice(
				address.longitude!,
				address.latitude!,
				layerIds,
			);

			if (price) {
				console.log(`[BRW] Success: €${price}/m²\n`);
				return { price, source: "brw" };
			}

			// Fallback for Grundstück: try with Bauland layers [0, 1] if not already tried
			const fallbackLayers = [0, 1];
			const alreadyTriedFallback =
				layerIds.length === 2 && layerIds.includes(0) && layerIds.includes(1);

			if (address.isGrundstuck() && !alreadyTriedFallback) {
				console.log(
					`[BRW] No price found with layers [${layerIds.join(", ")}], trying fallback [0, 1]`,
				);

				const fallbackPrice = await this.database.getBrwPrice(
					address.longitude!,
					address.latitude!,
					fallbackLayers,
				);

				if (fallbackPrice) {
					console.log(`[BRW Fallback] Success: €${fallbackPrice}/m²\n`);
					return { price: fallbackPrice, source: "brw_fallback" };
				}
			}

			console.log("[BRW] No price found\n");
			return { price: null, source: "none" };
		} catch (error) {
			console.error("[BRW] Error:", error);
			return { price: null, source: "none" };
		}
	}

	private async executeForResidential(
		address: PropertyAddress,
	): Promise<PriceResult> {
		console.log(
			`Property Type: ${address.propertyType} - Using Immoscout + Database cascade\n`,
		);

		const strategies = [
			{
				strategy: this.createImmoscoutStrategy("City + Street", (a) =>
					a.buildCityStreetQuery(),
				),
				source: "is_city_street" as const,
			},
			{
				strategy: this.createImmoscoutStrategy("PLZ + Street", (a) =>
					a.buildPlzStreetQuery(),
				),
				source: "is_plz_street" as const,
			},
			{ strategy: this.createDatabaseStrategy(), source: "database" as const },
			{
				strategy: this.createImmoscoutStrategy("PLZ Only", (a) =>
					a.buildPlzOnlyQuery(),
				),
				source: "is_plz_only" as const,
			},
		];

		for (let i = 0; i < strategies.length; i++) {
			const { strategy, source } = strategies[i]!;

			if (!strategy.canHandle(address)) {
				console.log(`[Strategy ${i + 1}] ${strategy.name} - Skipped\n`);
				continue;
			}

			console.log(`[Strategy ${i + 1}] Trying: ${strategy.name}`);

			try {
				const result = await strategy.execute(address);
				if (result.price !== null) {
					return { price: result.price, source, url: result.url };
				}
			} catch (error) {
				console.error(`[Strategy ${i + 1}] Error:`, error);
			}

			console.log(`[Strategy ${i + 1}] Failed\n`);
		}

		console.log("All strategies failed\n");
		return { price: null, source: "none" };
	}
}

// ============================================================================
// PUBLIC API
// ============================================================================

export class PropertyPriceService {
	private executor: StrategyExecutor;

	constructor() {
		const immoscout = new ImmoscoutClient();
		const database = new DatabaseClient();
		this.executor = new StrategyExecutor(immoscout, database);
	}

	async getPrice(address: PropertyAddress): Promise<PriceResult> {
		return this.executor.execute(address);
	}
}
