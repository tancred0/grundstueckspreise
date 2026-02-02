"use server";

import {
	type LeadEmailData,
	sendBewertungsEmail,
} from "@/server/actions/send-bewertung-email";
import { db } from "@/server/db";
import { leads, type NewLead } from "@/server/db/schema";
import { salesforceClient } from "@/server/salesforce/client";
import { mapDatabaseLeadToSalesforce } from "@/server/salesforce/mapping";
import {
	type PriceResult,
	PropertyAddress,
	PropertyPriceService,
	type PropertyType,
} from "@/server/valuation-service/core";
import { ValuationUploadService } from "@/server/valuation-service/valuation-upload";

// Helper
function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

// Pipeline result type
interface UploadResult {
	success: boolean;
	salesforceLeadId: string | null;
	dbLeadId: number | null;
	valuationUploaded: boolean;
	emailSent: boolean;
	emailId: string | null;
	errors: Array<{ step: string; error: string }>;
}

class LeadUploadPipeline {
	private leadData: NewLead;
	private priceResult: PriceResult | null = null;
	private totalValuation: number | null = null;
	private salesforceLeadId: string | null = null;
	private insertedLead: typeof leads.$inferSelect | undefined;
	private valuationUploaded = false;
	private emailSent = false;
	private emailId: string | null = null;
	private errors: Array<{ step: string; error: string }> = [];

	constructor(leadData: NewLead) {
		this.leadData = leadData;
	}

	async run(): Promise<UploadResult> {
		await this.fetchPrice();
		await this.createSalesforceLead();
		await this.saveLeadToDB();
		await this.saveValuationToDB();
		await this.sendEmail();
		await this.sendWebhook();
		return this.getResult();
	}

	private async fetchPrice(): Promise<void> {
		try {
			const {
				property_city,
				property_street,
				property_postalcode,
				property_type,
			} = this.leadData;

			if (
				!property_city ||
				!property_street ||
				!property_postalcode ||
				!property_type
			) {
				console.log("[INFO] Missing property data, skipping price fetch");
				return;
			}

			const propertyAddress = new PropertyAddress(
				property_city,
				property_street,
				property_postalcode,
				property_type as PropertyType,
				this.leadData.property_latitude ?? undefined,
				this.leadData.property_longitude ?? undefined,
				this.leadData.property_type_details ?? undefined,
			);

			const priceService = new PropertyPriceService();
			const result = await priceService.getPrice(propertyAddress);

			if (result.price) {
				this.priceResult = result;
				const area =
					property_type === "Grundstück" || property_type === "Gewerbe"
						? this.leadData.property_plot_area || 0
						: this.leadData.property_living_area || 0;
				this.totalValuation = result.price * area;

				console.log("[SUCCESS] Price fetched:", {
					price: result.price,
					source: result.source,
					totalValuation: this.totalValuation,
				});
			} else {
				console.log("[INFO] No price found for property");
			}
		} catch (error) {
			console.error("[ERROR] Failed to fetch price:", getErrorMessage(error));
			this.errors.push({ step: "price", error: getErrorMessage(error) });
		}
	}

	private async createSalesforceLead(): Promise<void> {
		try {
			const valuation = this.priceResult?.price
				? {
						priceSqm: this.priceResult.price,
						total: this.totalValuation!,
						source: this.priceResult.source,
					}
				: undefined;

			const sfData = mapDatabaseLeadToSalesforce(this.leadData, valuation);
			console.log("[DEBUG] Salesforce lead data:", sfData);

			this.salesforceLeadId = await salesforceClient.createLead(sfData);
			console.log(
				"[SUCCESS] Lead created in Salesforce:",
				this.salesforceLeadId,
			);
		} catch (error) {
			console.error(
				"[ERROR] Failed to create Salesforce lead:",
				getErrorMessage(error),
			);
			this.errors.push({ step: "salesforce", error: getErrorMessage(error) });
		}
	}

	private async saveLeadToDB(): Promise<void> {
		try {
			const sfError =
				this.errors.find((e) => e.step === "salesforce")?.error ?? null;

			const [lead] = await db
				.insert(leads)
				.values({
					...this.leadData,
					salesforce_id: this.salesforceLeadId,
					sf_error: sfError,
				})
				.returning();

			this.insertedLead = lead;
			console.log("[SUCCESS] Lead saved to database:", lead?.id ?? "No ID");
		} catch (error) {
			console.error(
				"[ERROR] Failed to save lead to database:",
				getErrorMessage(error),
			);
			this.errors.push({ step: "database", error: getErrorMessage(error) });
		}
	}

	private async saveValuationToDB(): Promise<void> {
		if (!this.insertedLead || !this.priceResult?.price) return;

		try {
			const valuationService = new ValuationUploadService();

			if (await valuationService.shouldUpload(this.priceResult.source)) {
				await valuationService.uploadValuation({
					leadId: this.salesforceLeadId ?? undefined,
					dbId: this.insertedLead.id,
					priceSqm: this.priceResult.price,
					valuation: this.totalValuation!,
					postalCode: this.leadData.property_postalcode!,
					propertyType: this.leadData.property_type!,
					propertyTypeDetail: this.leadData.property_type_details ?? undefined,
					source: this.priceResult.source,
					url: this.priceResult.url,
				});
				this.valuationUploaded = true;
				console.log("[SUCCESS] Valuation uploaded");
			}
		} catch (error) {
			console.error(
				"[ERROR] Failed to upload valuation:",
				getErrorMessage(error),
			);
			this.errors.push({ step: "valuation", error: getErrorMessage(error) });
		}
	}

	private async sendEmail(): Promise<void> {
		if (!this.insertedLead) return;
		if (!this.priceResult?.price) return; // No price = no email
		if (this.leadData.intention_request_reason === "Immobilienverkauf") return;

		try {
			const emailData: LeadEmailData = {
				id: this.insertedLead.id,
				user_email: this.insertedLead.user_email,
				user_salutation: this.insertedLead.user_salutation,
				user_lastname: this.insertedLead.user_lastname,
				property_address:
					this.insertedLead.property_street &&
					this.insertedLead.property_house_number
						? `${this.insertedLead.property_street} ${this.insertedLead.property_house_number}`
						: this.insertedLead.property_street,
				property_postalcode: this.insertedLead.property_postalcode,
				property_city: this.insertedLead.property_city,
				property_type: this.insertedLead.property_type,
				property_type_details: this.insertedLead.property_type_details,
				property_living_area: this.insertedLead.property_living_area,
				property_plot_area: this.insertedLead.property_plot_area,
				property_state: this.insertedLead.property_state,
				price_sqm: this.priceResult?.price ?? null,
				valuation: this.totalValuation,
				valuation_source: this.priceResult?.source ?? null,
				domain: this.insertedLead.track_funnel_source,
				request_reason: this.insertedLead.intention_request_reason,
			};

			const result = await sendBewertungsEmail(emailData, {
				dryRun: false,
				skipDbUpdate: false,
			});

			this.emailSent = result.success;
			this.emailId = result.emailId ?? null;

			if (this.emailSent) {
				console.log("[SUCCESS] Email sent:", this.emailId);
			} else {
				console.error("[ERROR] Email failed:", result.error);
				this.errors.push({
					step: "email",
					error: result.error ?? "Unknown email error",
				});
			}
		} catch (error) {
			console.error("[ERROR] Failed to send email:", getErrorMessage(error));
			this.errors.push({ step: "email", error: getErrorMessage(error) });
		}
	}

	private async sendWebhook(): Promise<void> {
		const webhookUrl =
			"https://hook.eu2.make.com/s55xlktqq03jg3eaj81r1ndl2tgucimr";

		try {
			const webhookPayload = {
				...this.leadData,
				salesforce_id: this.salesforceLeadId,
				sf_error:
					this.errors.find((e) => e.step === "salesforce")?.error ?? null,
				db_success: !!this.insertedLead,
				db_error: this.errors.find((e) => e.step === "database")?.error ?? null,
				db_lead_id: this.insertedLead?.id ?? null,
				valuation_price_sqm: this.priceResult?.price ?? null,
				valuation_price: this.totalValuation,
				valuation_source: this.priceResult?.source ?? null,
				email_sent: this.emailSent,
				email_id: this.emailId,
				email_error: this.errors.find((e) => e.step === "email")?.error ?? null,
			};

			const response = await fetch(webhookUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(webhookPayload),
			});

			if (response.ok) {
				console.log("[SUCCESS] Webhook sent");
			} else {
				console.error(
					"[ERROR] Webhook failed:",
					response.status,
					response.statusText,
				);
			}
		} catch (error) {
			console.error("[ERROR] Failed to send webhook:", getErrorMessage(error));
			this.errors.push({ step: "webhook", error: getErrorMessage(error) });
		}
	}

	private getResult(): UploadResult {
		return {
			success: !!this.insertedLead,
			salesforceLeadId: this.salesforceLeadId,
			dbLeadId: this.insertedLead?.id ?? null,
			valuationUploaded: this.valuationUploaded,
			emailSent: this.emailSent,
			emailId: this.emailId,
			errors: this.errors,
		};
	}
}

// Public API
export async function uploadLead(leadData: NewLead): Promise<UploadResult> {
	const pipeline = new LeadUploadPipeline(leadData);
	return pipeline.run();
}
