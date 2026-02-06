import capitalizeWords from "@/components/utils/capitalizeWords";
import type { NewLead } from "@/server/db/schema";
import type { Lead } from "@/server/salesforce/types";

/**
 * Database fields that should not be mapped to Salesforce
 */
type ExcludedLeadFields =
	| "id"
	| "salesforce_id"
	| "created_at"
	| "track_funnel_version"
	| "track_environment"
	| "track_url_state"
	| "track_url_city"
	| "track_url_district"
	| "property_house_number"
	| "property_state"
	| "property_country"
	| "sf_error"
	| "email_id"
	| "email_sent_at"
	| "email_error"
	| "email_error_count"
	| "brw_valuation"
	| "brw_show_online"
	| "property_location_type"
	| "property_street_and_number"
	| "property_city_input_raw"
	| "property_address_confirmed"
	| "property_has_building"
	| "stripe_session_id"
	| "track_is_experiment"
	| "track_experiment_id";

/**
 * Mappable lead fields (all NewLead fields except internal ones)
 */
export type MappableLeadField = Exclude<keyof NewLead, ExcludedLeadFields>;

/**
 * Field mapping configuration
 */
interface FieldMapping {
	/** The Salesforce field name */
	salesforceField: keyof Lead;
	/** Optional transformation function to convert database value to Salesforce format */
	transform?: (value: unknown, lead?: NewLead) => unknown;
}

/**
 * Derived field mapping for Salesforce fields that are computed from DB data
 * but don't have a direct 1:1 mapping to a database field
 */
interface DerivedFieldMapping {
	/** The Salesforce field name */
	salesforceField: keyof Lead;
	/** Computation function to derive value from the entire lead object */
	compute: (lead: NewLead) => unknown;
}

/**
 * Mapping dictionary from database schema fields to Salesforce Lead fields
 * Key: Database field name (from NewLead type)
 * Value: Salesforce field configuration
 */
export const LEAD_FIELD_MAPPING: Record<MappableLeadField, FieldMapping> = {
	// track_funnel_version: { // Version = 1.0
	// 	salesforceField: "Testing_and_Q_A__c", // Using Testing field for funnel version tracking
	// },
	// track_environment: { // Environment = production / development
	// 	salesforceField: "Testing_and_Q_A__c", // Can be combined with version or used separately
	// },
	// track_url_state: {
	// 	salesforceField: "lead_Landkreis__c", // Mapping to Landkreis (district/county)
	// },
	// track_url_city: {
	// 	salesforceField: "lead_Property_City__c", // Can be mapped to property city
	// },
	// track_url_district: {
	// 	salesforceField: "lead_Stadtteil__c", // Stadtteil means district/neighborhood
	// },

	// DOUBLE CHECK
	track_ga_user_id: {
		salesforceField: "lead_gclid__c", // May need different mapping
	},
	track_rs_anonymous_id: {
		salesforceField: "rudderstack_anon_id__c",
	},
	track_rs_session_id: {
		salesforceField: "lead_rs_session_id_c__c",
		transform: (value: unknown): string | undefined =>
			value ? String(value) : undefined,
	},

	// Internal tracking
	int_process_number: {
		salesforceField: "int_process_number__c",
	},
	// Funnel tracking
	track_funnel_source: {
		salesforceField: "lead_Source__c",
	},
	track_funnel_type: {
		salesforceField: "lead_Lead_Type__c",
	},
	track_funnel_started_at: {
		salesforceField: "lead_Make_Submission_DateTime__c", // Using submission datetime as proxy
		transform: (value: unknown): string | undefined => {
			if (!value) return undefined;
			const date = new Date(value as string | number | Date);
			return date.toISOString();
		},
	},

	track_page_first_visit: {
		salesforceField: "url_first_page__c",
	},
	track_page_funnel_submitted: {
		salesforceField: "lead_url_conversion__c",
	},

	// Property details
	property_type: {
		salesforceField: "lead_Immobilien_Typ__c",
	},
	property_type_details: {
		salesforceField: "lead_immobilien_typ_detail__c",
	},
	property_house_units: {
		salesforceField: "lead_Anzahl_Einheiten__c",
	},
	property_living_area: {
		salesforceField: "lead_Wohnflaeche__c",
		transform: (value: unknown): string | undefined =>
			value ? String(value) : undefined,
	},
	property_plot_area: {
		salesforceField: "lead_Grundstuecksflaeche__c",
		transform: (value: unknown): string | undefined =>
			value ? String(value) : undefined,
	},
	property_year_built: {
		salesforceField: "lead_Baujahr_der_Immobilie__c",
		transform: (value: unknown): string | undefined =>
			value ? String(value) : undefined,
	},
	property_condition: {
		salesforceField: "lead_Zustand_der_Immobilie__c",
		transform: (value: unknown): string | undefined => {
			// Mapping logic for Zustand der Immobilie (condition)
			if (!value) return undefined;

			// Normalize the value for safer matching
			const condition = value.toString();

			const values = [
				"Gut erhalten",
				"Neulich renoviert",
				"Neuwertig",
				"Renovierungsbedürftig",
			];

			if (values.includes(condition)) {
				return condition;
			}

			// Special handling: treat "Neu" as "Neuwertig"
			if (condition === "Neu") {
				return "Neuwertig";
			}

			// Default fallback
			return "Gut erhalten";
		},
	},

	// Property location
	property_postalcode: {
		salesforceField: "PostalCode",
	},
	property_city: {
		salesforceField: "City",
		transform: (value: unknown): string | undefined => {
			if (!value) return undefined;
			return value.toString().slice(0, 40);
		},
	},
	property_street: {
		salesforceField: "Street",
		transform: (value: unknown, lead?: NewLead): string | undefined => {
			// Combine street and house number if both exist
			const street = value as string | undefined;
			const houseNumber = lead?.property_house_number;
			if (street && houseNumber) {
				return `${street} ${houseNumber}`;
			}
			return street;
		},
	},
	property_latitude: {
		salesforceField: "lead_Geolocation__Latitude__s",
	},
	property_longitude: {
		salesforceField: "lead_Geolocation__Longitude__s",
	},

	// User ownership
	user_is_owner: {
		salesforceField: "lead_is_owner__c",
	},

	// User intentions
	intention_request_reason: {
		salesforceField: "lead_Klassifikation__c",
	},
	intention_request_reason_detail: {
		salesforceField: "Bewertungshintergrund_Detail__c",
	},
	intention_horizon_sell: {
		salesforceField: "Verkaufshorizont__c",
	},
	intention_horizon_buy: {
		salesforceField: "Kaufhorizont__c",
	},

	// Broker coverage
	int_broker_coverage: {
		salesforceField: "lead_Covered_at_registration__c",
	},
	int_broker_coverage_active: {
		salesforceField: "lead_Covered_by_broker_now__c",
	},

	// User information
	user_phone: {
		salesforceField: "MobilePhone",
	},
	user_salutation: {
		salesforceField: "gender__c",
	},
	user_email: {
		salesforceField: "Email",
	},
	user_firstname: {
		salesforceField: "FirstName",
		transform: (value: unknown): string | undefined => {
			if (!value) return undefined;
			return value.toString().slice(0, 40);
		},
	},
	user_lastname: {
		salesforceField: "LastName",
		transform: (value: unknown): string | undefined => {
			if (!value) return undefined;
			return value.toString().slice(0, 40);
		},
	},

	// UTM Parameters
	utm_source: {
		salesforceField: "lead_utm_source__c",
	},
	utm_medium: {
		salesforceField: "lead_utm_medium__c",
	},
	utm_campaign: {
		salesforceField: "lead_utm_campaign__c",
	},
	utm_term: {
		salesforceField: "lead_utm_term__c",
	},
	utm_content: {
		salesforceField: "lead_utm_content__c",
	},
	utm_channel: {
		salesforceField: "lead_utm_channel__c",
	},
	utm_adid: {
		salesforceField: "lead_utm_adid__c",
	},
	utm_cid: {
		salesforceField: "lead_utm_cid__c",
	},
	utm_agid: {
		salesforceField: "lead_utm_agid__c",
	},
	utm_dev: {
		salesforceField: "lead_utm_dev__c",
	},
	utm_devicemodel: {
		salesforceField: "lead_utm_devicemodel__c",
	},
	utm_loc: {
		salesforceField: "lead_utm_loc__c",
	},
	utm_mt: {
		salesforceField: "lead_utm_mt__c",
	},
	utm_nw: {
		salesforceField: "lead_utm_nw__c",
	},
	utm_targetid: {
		salesforceField: "lead_utm_targetid__c",
	},
	utm_placement: {
		salesforceField: "lead_utm_placement__c",
	},
	utm_target: {
		salesforceField: "lead_utm_target__c",
	},
	utm_position: {
		salesforceField: "lead_utm_position__c",
	},
	utm_aceid: {
		salesforceField: "lead_utm_aceid__c",
	},
	utm_physicalcity: {
		salesforceField: "lead_utm_physicalcity__c",
	},
	utm_physicalcountry: {
		salesforceField: "lead_utm_physicalcountry__c",
	},
	utm_googleplaceid: {
		salesforceField: "lead_utm_googleplaceid__c",
	},
	utm_extensionid: {
		salesforceField: "utm_extensionid__c",
	},
	gclid: {
		salesforceField: "lead_gclid__c",
	},
	gbraid: {
		salesforceField: "lead_gbraid_c__c",
	},
	wbraid: {
		salesforceField: "lead_wbraid_c__c",
	},

	// BRW-specific fields
	brw_value: {
		salesforceField: "lead_Aktueller_Bodenrichtwert__c",
	},
	brw_zip_code: {
		salesforceField: "leadAverage_BRW_this_ZIP_code__c",
	},
	brw_gfz: {
		salesforceField: "lead_GFZ__c",
	},
	brw_grz: {
		salesforceField: "lead_GRZ__c",
	},
	brw_gez: {
		salesforceField: "lead_GEZ__c",
	},
	brw_gutachterausschuss: {
		salesforceField: "lead_Gutachterausschuss_BRW__c",
	},
	brw_gutachter_date: {
		salesforceField: "lead_Stichtag_BRW_from_API__c",
	},

	// Property location fields (BRW)
	property_gemarkung: {
		salesforceField: "lead_Gemarkung_Gemeinde__c",
		transform: (value: unknown): string | undefined => {
			if (!value) return undefined;
			return capitalizeWords(value.toString());
		},
	},
	property_flur: {
		salesforceField: "lead_Flur__c",
	},
	property_flurstueck: {
		salesforceField: "lead_Flurstueck__c",
	},
	property_flurstueck_nenner: {
		salesforceField: "Flurstuecknenner__c",
	},

	// Intention fields
	intention_wants_appraisal: {
		salesforceField: "wants_gutachterbewertung__c",
	},
	intention_appraisal_confirmation: {
		salesforceField: "lead_intention_appraisal_confirmation__c",
	},

	// Timestamps
	date_submitted: {
		salesforceField: "lead_Make_Submission_DateTime__c",
		transform: (value: unknown): string | undefined => {
			if (!value) return undefined;
			const date = new Date(value as string | number | Date);
			return date.toISOString();
		},
	},
};

/**
 * Mapping for derived/computed Salesforce fields
 * These fields are computed from multiple database fields or require complex logic
 */
export const DERIVED_FIELD_MAPPING: DerivedFieldMapping[] = [
	{
		salesforceField: "Company",
		compute: (lead: NewLead): string | undefined => {
			const firstName = lead.user_firstname;
			const lastName = lead.user_lastname;

			// Combine first and last name with proper spacing
			if (firstName && lastName) {
				return `${firstName} ${lastName}`;
			}
			// Return single name if only one is available
			if (firstName) return firstName;
			if (lastName) return lastName;

			return undefined;
		},
	},
	{
		salesforceField: "lead_Property_Street_Housenumber__c",
		compute: (lead: NewLead): string | undefined => {
			const street = lead.property_street;
			const houseNumber = lead.property_house_number;
			if (street && houseNumber) {
				return `${street} ${houseNumber}`;
			}
			return undefined;
		},
	},
	{
		salesforceField: "lead_User_agreement__c",
		compute: (): boolean => true,
	},
	{
		salesforceField: "lead_Average_Bodenrichtwert__c",
		compute: (lead: NewLead): number => {
			const plotArea = lead.property_plot_area;
			const brw = lead.brw_value ?? lead.brw_zip_code;

			if (!plotArea || !brw) return 200_000;

			return Math.round(plotArea * brw * 100) / 100;
		},
	},
	{
		salesforceField: "lead_With_real_estate__c",
		compute: (lead: NewLead): string =>
			lead.property_type !== "Grundstück" ? "yes" : "no",
	},
	// Add more derived fields here as needed
	// Example: combining track_funnel_version + track_environment
];

/**
 * Helper function to map database lead to Salesforce lead
 * @param dbLead - Lead from database
 * @param valuation - Optional valuation data to include
 * @returns Partial Salesforce Lead object
 */
export function mapDatabaseLeadToSalesforce(
	dbLead: NewLead,
	valuation?: { priceSqm: number; total: number; source: string },
): Partial<Lead> {
	const salesforceLead: Partial<Lead> = {};

	// Process regular field mappings
	for (const [dbField, mapping] of Object.entries(LEAD_FIELD_MAPPING)) {
		const value = dbLead[dbField as keyof NewLead];

		// Skip if value is null or undefined
		if (value === null || value === undefined) {
			continue;
		}

		// Apply transformation if exists
		const transformedValue = mapping.transform
			? mapping.transform(value, dbLead)
			: value;

		// Only add if transformed value is not undefined
		if (transformedValue !== undefined) {
			(salesforceLead as Record<string, unknown>)[mapping.salesforceField] =
				transformedValue;
		}
	}

	// Process derived field mappings
	for (const derivedMapping of DERIVED_FIELD_MAPPING) {
		const computedValue = derivedMapping.compute(dbLead);

		// Only add if computed value is not undefined
		if (computedValue !== undefined) {
			(salesforceLead as Record<string, unknown>)[
				derivedMapping.salesforceField
			] = computedValue;
		}
	}

	// Add valuation data if provided
	if (valuation) {
		salesforceLead.valuation_sqm__c = valuation.priceSqm;
		salesforceLead.valuation_total__c = valuation.total;
		salesforceLead.valuation_type__c = valuation.source;
	}

	// Note: CreatedDate is a read-only system field in Salesforce and cannot be set manually
	// It will be automatically populated by Salesforce when the record is created

	return salesforceLead;
}

/**
 * Helper function to get Salesforce field name for a database field
 * @param dbField - Database field name
 * @returns Salesforce field name or undefined if not mapped
 */
export function getSalesforceFieldName(
	dbField: MappableLeadField,
): keyof Lead | undefined {
	return LEAD_FIELD_MAPPING[dbField]?.salesforceField;
}

// Feedback
// - propagate URL for Bewertungsdokument
// - propagate commision_pct

// Lead
// - funnel_version is missing
// - track_environment
