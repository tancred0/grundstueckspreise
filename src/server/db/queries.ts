import { and, eq, isNotNull, isNull, ne, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { leads, valuation } from "@/server/db/schema";

export const QUERIES = {
	/**
	 * Get leads for mailing with configurable filters
	 * Fixed conditions: production, not Immobilienverkauf, has price_sqm
	 * @param propertyType - e.g. 'Haus'
	 * @param count - Number of leads to fetch (undefined = all matching leads)
	 */
	getLeadsForMailBatch: async (propertyType: string, count?: number) => {
		const query = db
			.select({
				id: leads.id,
				salesforce_id: leads.salesforce_id,
				user_salutation: leads.user_salutation,
				user_lastname: leads.user_lastname,
				property_address:
					sql<string>`CONCAT(${leads.property_street}, ' ', ${leads.property_house_number})`.as(
						"property_address",
					),
				property_postalcode: leads.property_postalcode,
				property_city: leads.property_city,
				property_type: leads.property_type,
				property_type_details: leads.property_type_details,
				property_living_area: leads.property_living_area,
				property_plot_area: leads.property_plot_area,
				property_state: leads.property_state,
				user_email: leads.user_email,
				price_sqm: valuation.price_sqm,
				valuation: valuation.valuation,
				valuation_source: valuation.valuation_source,
				domain: leads.track_funnel_source,
				request_reason: leads.intention_request_reason,
			})
			.from(leads)
			.leftJoin(valuation, eq(leads.salesforce_id, valuation.lead_id))
			.where(
				and(
					// Fixed conditions - always applied
					eq(leads.track_environment, "production"),
					ne(leads.intention_request_reason, "Immobilienverkauf"),
					isNull(leads.email_id),
					// Configurable input
					eq(leads.property_type, propertyType),
				),
			)
			.orderBy(leads.property_state);

		if (count !== undefined) {
			return query.limit(count);
		}
		return query;
	},
};

export const MUTATIONS = {
	/**
	 * Update lead with email tracking information after successful email send
	 */
	updateLeadEmailTracking: async (leadId: number, emailId: string) => {
		await db
			.update(leads)
			.set({
				email_id: emailId,
				email_sent_at: new Date(),
				email_error: null, // Clear any previous error
			})
			.where(eq(leads.id, leadId));
	},

	/**
	 * Update lead with email error information when email send fails
	 */
	updateLeadEmailError: async (leadId: number, error: string) => {
		await db
			.update(leads)
			.set({
				email_error: error.substring(0, 1000), // Truncate to fit schema limit
				email_error_count: sql`${leads.email_error_count} + 1`,
			})
			.where(eq(leads.id, leadId));
	},
};
