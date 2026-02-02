import { eq, sql } from "drizzle-orm";
import {
	bigint,
	boolean,
	doublePrecision,
	integer,
	pgSchema,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// Create the leads schema namespace
export const leadsSchema = pgSchema("leads");

// Define the table within the leads schema
export const leads = leadsSchema.table("leads", {
	id: serial("id").primaryKey(),

	// Internal tracking
	int_process_number: varchar("int_process_number", { length: 255 }),

	// Funnel tracking
	track_funnel_source: varchar("track_funnel_source", {
		length: 255,
	}).notNull(),
	track_funnel_type: varchar("track_funnel_type", { length: 255 }).notNull(),
	track_funnel_version: varchar("track_funnel_version", {
		length: 255,
	}).notNull(),
	track_funnel_started_at: timestamp("track_funnel_started_at"),
	track_environment: varchar("track_environment", { length: 50 }),

	// Property details
	property_type: varchar("property_type", { length: 255 }),
	property_type_details: varchar("property_type_details", { length: 255 }),
	property_house_units: integer("property_house_units"),
	property_living_area: integer("property_living_area"),
	property_plot_area: integer("property_plot_area"),
	property_year_built: integer("property_year_built"),
	property_condition: varchar("property_condition", { length: 255 }),

	// Property location
	property_postalcode: varchar("property_postalcode", { length: 20 }),
	property_city: varchar("property_city", { length: 255 }),
	property_street: varchar("property_street", { length: 255 }),
	property_house_number: varchar("property_house_number", { length: 50 }),
	property_state: varchar("property_state", { length: 255 }),
	property_country: varchar("property_country", { length: 255 }),
	property_latitude: doublePrecision("property_latitude"),
	property_longitude: doublePrecision("property_longitude"),
	property_street_and_number: varchar("property_street_and_number", {
		length: 255,
	}),
	property_city_input_raw: varchar("property_city_input_raw", { length: 255 }),
	property_address_confirmed: boolean("property_address_confirmed"),
	property_has_building: boolean("property_has_building"),

	// User ownership
	user_is_owner: varchar("user_is_owner", { length: 255 }),

	// User intentions
	intention_request_reason: varchar("intention_request_reason", {
		length: 255,
	}),
	intention_request_reason_detail: varchar("intention_request_reason_detail", {
		length: 255,
	}),
	intention_horizon_sell: varchar("intention_horizon_sell", { length: 255 }),
	intention_horizon_buy: varchar("intention_horizon_buy", { length: 255 }),

	// Broker coverage
	int_broker_coverage: boolean("int_broker_coverage"),
	int_broker_coverage_active: boolean("int_broker_coverage_active"),

	// BRW-specific fields
	brw_value: doublePrecision("brw_value"),
	brw_valuation: integer("brw_valuation"),
	brw_gfz: varchar("brw_gfz", { length: 8 }),
	brw_grz: varchar("brw_grz", { length: 8 }),
	brw_gez: varchar("brw_gez", { length: 8 }),
	brw_gutachterausschuss: varchar("brw_gutachterausschuss", { length: 255 }),
	brw_gutachter_date: varchar("brw_gutachter_date", { length: 16 }),
	brw_zip_code: doublePrecision("brw_zip_code"),
	brw_show_online: boolean("brw_show_online"),

	// Additional property location fields (from BRW)
	property_location_type: varchar("property_location_type", { length: 16 }),
	property_gemarkung: varchar("property_gemarkung", { length: 255 }),
	property_flur: varchar("property_flur", { length: 8 }),
	property_flurstueck: varchar("property_flurstueck", { length: 8 }),
	property_flurstueck_nenner: varchar("property_flurstueck_nenner", {
		length: 8,
	}),

	// Intention fields
	intention_wants_appraisal: boolean("intention_wants_appraisal"),
	intention_appraisal_confirmation: boolean("intention_appraisal_confirmation"),

	// Page tracking (URLs, not timestamps)
	track_page_first_visit: varchar("track_page_first_visit", { length: 255 }),
	track_page_funnel_submitted: varchar("track_page_funnel_submitted", {
		length: 255,
	}),
	track_url_state: varchar("track_url_state", { length: 255 }),
	track_url_city: varchar("track_url_city", { length: 255 }),
	track_url_district: varchar("track_url_district", { length: 255 }),
	track_ga_user_id: varchar("track_ga_user_id", { length: 255 }),
	track_rs_anonymous_id: varchar("track_rs_anonymous_id", { length: 255 }),
	track_rs_session_id: bigint("track_rs_session_id", { mode: "number" }),
	track_is_experiment: boolean("track_is_experiment"),
	track_experiment_id: integer("track_experiment_id"),

	// User information
	user_phone: varchar("user_phone", { length: 50 }),
	user_salutation: varchar("user_salutation", { length: 50 }),
	user_firstname: varchar("user_firstname", { length: 255 }),
	user_lastname: varchar("user_lastname", { length: 255 }),
	user_email: varchar("user_email", { length: 255 }),

	// UTM Parameters
	utm_source: varchar("utm_source", { length: 255 }),
	utm_medium: varchar("utm_medium", { length: 255 }),
	utm_campaign: varchar("utm_campaign", { length: 255 }),
	utm_term: varchar("utm_term", { length: 255 }),
	utm_content: varchar("utm_content", { length: 255 }),
	utm_channel: varchar("utm_channel", { length: 255 }),
	utm_adid: varchar("utm_adid", { length: 255 }),
	utm_cid: varchar("utm_cid", { length: 255 }),
	utm_agid: varchar("utm_agid", { length: 255 }),
	utm_dev: varchar("utm_dev", { length: 255 }),
	utm_devicemodel: varchar("utm_devicemodel", { length: 255 }),
	utm_loc: varchar("utm_loc", { length: 255 }),
	utm_mt: varchar("utm_mt", { length: 255 }),
	utm_nw: varchar("utm_nw", { length: 255 }),
	utm_targetid: varchar("utm_targetid", { length: 255 }),
	utm_placement: varchar("utm_placement", { length: 255 }),
	utm_target: varchar("utm_target", { length: 255 }),
	utm_position: varchar("utm_position", { length: 255 }),
	utm_aceid: varchar("utm_aceid", { length: 255 }),
	utm_physicalcity: varchar("utm_physicalcity", { length: 255 }),
	utm_physicalcountry: varchar("utm_physicalcountry", { length: 255 }),
	utm_googleplaceid: varchar("utm_googleplaceid", { length: 255 }),
	utm_extensionid: varchar("utm_extensionid", { length: 255 }),
	gclid: varchar("gclid", { length: 255 }),
	gbraid: varchar("gbraid", { length: 255 }),
	wbraid: varchar("wbraid", { length: 255 }),

	// Payment integration
	stripe_session_id: varchar("stripe_session_id", { length: 255 }),

	// Salesforce integration
	salesforce_id: varchar("salesforce_id", { length: 255 }),
	sf_error: varchar("sf_error", { length: 1000 }),

	// Timestamps
	date_submitted: timestamp("date_submitted"), // Set explicitly for webhook sync
	created_at: timestamp("created_at").defaultNow().notNull(),

	email_id: varchar("email_id", { length: 255 }),
	email_sent_at: timestamp("email_sent_at"),
	email_error: varchar("email_error", { length: 1000 }),
	email_error_count: integer("email_error_count").default(0).notNull(),
});

// Export the insert type for use in your application
export type NewLead = typeof leads.$inferInsert;
export type Lead = typeof leads.$inferSelect;

// Define the valuation table within the leads schema
export const valuation = leadsSchema.table("valuation", {
	lead_id: varchar("lead_id", { length: 18 }),
	db_id: integer("db_id"),
	price_sqm: doublePrecision("price_sqm"),
	valuation: bigint("valuation", { mode: "number" }),
	is_error: boolean("is_error").default(false).notNull(),
	error_count: integer("error_count").default(0).notNull(),
	created_at: timestamp("created_at").defaultNow().notNull(),
	url: varchar("url", { length: 255 }),
	postal_code: varchar("postal_code", { length: 5 }),
	property_type_clean: varchar("property_type_clean", { length: 32 }),
	is_exact_address: boolean("is_exact_address"),
	property_type_detail_clean: varchar("property_type_detail_clean", {
		length: 32,
	}),
	valuation_source: varchar("valuation_source", { length: 255 }),
	sf_synced_at: timestamp("sf_synced_at"),
	sf_sync_error: varchar("sf_sync_error", { length: 1000 }),
});

// Export the insert type for valuation
export type NewValuation = typeof valuation.$inferInsert;
export type Valuation = typeof valuation.$inferSelect;

// Valuation range view - aggregates price ranges by property type and postal code
export const valuationRange = leadsSchema.view("valuation_range").as((qb) =>
	qb
		.select({
			property_type_clean: valuation.property_type_clean,
			postal_code: valuation.postal_code,
			min_price: sql<number>`MIN(${valuation.price_sqm})`.as("min_price"),
			max_price: sql<number>`MAX(${valuation.price_sqm})`.as("max_price"),
			cnt: sql<number>`COUNT(*)`.as("cnt"),
		})
		.from(valuation)
		.where(eq(valuation.is_error, false))
		.groupBy(valuation.property_type_clean, valuation.postal_code),
);
