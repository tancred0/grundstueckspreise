import { db } from "../db/index";
import { valuation } from "../db/schema";
import type { PriceResult } from "./core";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ValuationData {
	leadId?: string;
	dbId?: number;
	priceSqm: number;
	valuation: number;
	postalCode: string;
	propertyType: string;
	propertyTypeDetail?: string;
	url?: string;
	source: PriceResult["source"];
}

// ============================================================================
// VALUATION UPLOAD SERVICE
// ============================================================================

export class ValuationUploadService {
	private determineIsExactAddress(source: PriceResult["source"]): boolean {
		// is_exact_address is true only when we have exact address match
		// City+Street or PLZ+Street = exact address
		// Database or PLZ Only = not exact address
		return source === "is_city_street" || source === "is_plz_street";
	}

	async uploadValuation(data: ValuationData): Promise<void> {
		try {
			const isExactAddress = this.determineIsExactAddress(data.source);

			await db.insert(valuation).values({
				lead_id: data.leadId || null,
				db_id: data.dbId || null,
				price_sqm: data.priceSqm,
				valuation: Math.round(data.valuation),
				is_error: false,
				url: data.url || null,
				postal_code: data.postalCode,
				property_type_clean: data.propertyType,
				is_exact_address: isExactAddress,
				property_type_detail_clean: data.propertyTypeDetail || null,
				valuation_source: data.source,
			});

			console.log(
				`[ValuationUpload] Success: Lead ID ${data.leadId || data.dbId}`,
			);
		} catch (error) {
			console.error("[ValuationUpload] Failed:", error);
			throw error;
		}
	}

	async shouldUpload(source: PriceResult["source"]): Promise<boolean> {
		// For exact address matches (City+Street, PLZ+Street), always upload
		if (source === "is_city_street" || source === "is_plz_street") {
			return true;
		}

		// For BRW (Bodenrichtwert) results, always upload
		if (source === "brw" || source === "brw_fallback") {
			return true;
		}

		// For PLZ Only, upload with is_exact_address = false
		if (source === "is_plz_only") {
			return true;
		}

		// For database source, still upload to track the valuation
		if (source === "database") {
			return true;
		}

		return false;
	}
}
