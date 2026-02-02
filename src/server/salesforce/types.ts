/**
 * Salesforce Object Types
 */

// Base Salesforce record interface
interface SalesforceRecord {
	Id?: string;
	CreatedById?: string;
	LastModifiedById?: string;
	OwnerId?: string;
	RecordTypeId?: string;
}

/**
 * Feedback (fb_) Salesforce Object
 */
// export interface FeedbackSF extends SalesforceRecord {
// 	// Picklist fields
// 	fb_Probability_of_closing__c?: string; // Abschlusswahrscheinlichkeit
// 	fb_Change_RSP_Stage__c?: string; // Change RSP Stage
// 	fb_Channel__c?: string; // Kanal
// 	fb_Loss_Reason__c?: string; // Loss Reason
// 	fb_Time_horizon_contract_signing__c?: string; // Zeitrahmen für Vertragsunterzeichnung

// 	// Formula fields (read-only)
// 	fb_Age_Last_Feedback_Reminder_in_hours__c?: number; // Age Last Feedback Reminder in hours
// 	fb_Broker_Email__c?: string; // Broker Email
// 	fb_Broker_Phone__c?: string; // Broker Phone
// 	fb_Contact_First_Name__c?: string; // Contact First Name
// 	fb_Contact_Full_Name__c?: string; // Contact Full Name
// 	fb_Contact_Whatsapp_Channel_Id__c?: string; // Contact Whatsapp Channel Id
// 	fb_Feedback_CaseSafe_Id__c?: string; // Feedback CaseSafe Id
// 	fb_Feedback_RecordType_Name__c?: string; // Feedback RecordType Name
// 	fb_Feedback_Reminder_Datetime__c?: string; // Feedback Reminder Datetime
// 	fb_Feedback_Reminder_Needed__c?: boolean; // Feedback Reminder Needed
// 	fb_feedback_via_Email__c?: boolean; // feedback via Email
// 	fb_feedback_via_WA__c?: boolean; // feedback via WA
// 	fb_Feedback_Type__c?: string; // Feedback-Typ
// 	fb_Makler_Name__c?: string; // Makler Name
// 	fb_Opportunity_Address__c?: string; // Opportunity Address
// 	fb_Owner_Name__c?: string; // Owner Name
// 	fb_RSP_Date__c?: string; // RSP Date
// 	fb_RSP_Name__c?: string; // RSP Name
// 	fb_RSP_Stage__c?: string; // RSP Stage

// 	// Text/External ID fields
// 	fb_Analyzed_Call_Id__c?: string; // Analyzed Call Id - Text(255) External ID

// 	// Date fields
// 	fb_Date__c?: string; // Datum
// 	fb_Date_for_next_feedback__c?: string; // Datum für das nächste Feedback
// 	fb_Planned_Go_Live_Date__c?: string; // Geplantes Go-Live-Datum
// 	fb_Go_Live_Date__c?: string; // Go-Live-Datum
// 	fb_On_site_appointment_held_on__c?: string; // On-site appointment held on
// 	fb_On_site_appointment_planned_on__c?: string; // On-site appointment planned on
// 	fb_Phone_appointment_held_on__c?: string; // Phone appointment held on
// 	fb_Phone_appointment_planned_on__c?: string; // Phone appointment planned on
// 	fb_Signing_Date__c?: string; // Unterzeichnungsdatum

// 	// Number/Currency fields
// 	fb_Estimated_property_value__c?: number; // Estimated property value - Number(18, 0)
// 	fb_Ca_commission_estimation_net__c?: number; // Geschätzte Provision (netto) in € - Currency(9, 0)
// 	fb_Go_live_price__c?: number; // Go-live price - Number(18, 0)
// 	fb_Commission_net__c?: number; // Provision (netto) in € - Currency(9, 0)
// 	fb_Starting_Price__c?: number; // Startpreis in € - Currency(9, 0)
// 	fb_Grade__c?: number; // Note - Number(1, 0)
// 	Schulnote__c?: number; // Schulnote - Number(18, 0)

// 	// Checkbox fields
// 	fb_isActive__c?: boolean; // isActive
// 	fb_Last_Feedback__c?: boolean; // Last Feedback
// 	fb_Last_Feedback_Broker__c?: boolean; // Last Feedback Broker
// 	fb_trigger_feedback_reminder__c?: boolean; // fb_trigger_feedback_reminder
// 	temp_trigger_populate_rsp_from_fb__c?: boolean; // temp trigger populate rsp from fb
// 	tmp_tobi__c?: boolean; // tmp - tobi

// 	// Date/Time fields
// 	fb_Last_Feedback_Reminder__c?: string; // Last Feedback Reminder

// 	// Lookup fields
// 	fb_Lead__c?: string; // Lead
// 	fb_Makler__c?: string; // Makler (Contact)
// 	fb_Opportunity__c?: string; // Opportunity
// 	fb_Qualifizierer__c?: string; // Qualifizierer (Contact)
// 	fb_Related_Sales_Process__c?: string; // Zugehöriger Verkaufsprozess

// 	// Long Text Area fields
// 	fb_Potential_blocker_for_sale__c?: string; // Potenzieller Verkaufsblocker - Long Text Area(5000)
// 	fb_summary__c?: string; // Zusammenfassung - Long Text Area(50000)

// 	// URL fields
// 	fb_Advertisement_URL__c?: string; // URL IS24/IW - URL(255)
// 	fb_Advertisement_URL_long__c?: string; // URL IS24/IW long - Long Text Area(3000)

// 	// Auto Number field
// 	Name?: string; // Feedback Name Generic - Auto Number

// }

// // TODO: new fields - luxi
// export interface Feedback extends FeedbackSF {
// 	fb_bewertung_document_url__c?: string; // Bewertung document url - URL(255)
// 	fb_commission_pct__c?: number; // Gesamtprovision (netto, %) - Number(3, 2)
// }

// /**
//  * Related Sales Process (rsp_) Salesforce Object
//  */
// export interface RelatedSalesProcess extends SalesforceRecord {
// 	// Formula fields (read-only)
// 	rsp_Baujahr_der_Immobilie__c?: string; // Baujahr der Immobilie
// 	rsp_Contact_E_Mail_Address__c?: string; // Contact E-Mail Address
// 	rsp_Contact_first_name__c?: string; // Contact first name
// 	rsp_Contact_full_name__c?: string; // Contact full name
// 	rsp_Contact_Leads_Sheet__c?: string; // Contact Leads Sheet
// 	rsp_Contact_phone_number__c?: string; // Contact phone number
// 	rsp_Contact_Type__c?: string; // Contact Type
// 	rsp_Converted_Lead_CaseSafe_ID__c?: string; // Converted Lead CaseSafe ID
// 	rsp_Created_YY_CM__c?: string; // Created YY/CM
// 	rsp_Created_YY_CW__c?: string; // Created YY/CW
// 	rsp_Feedback_via_Email_or_WA_active__c?: boolean; // Feedback via Email or WA active
// 	rsp_Flurstueck_Full__c?: string; // Flurstueck Full
// 	rsp_Grundstuecksflaeche__c?: string; // Grundstuecksflaeche
// 	rsp_Immobilien_Typ__c?: string; // Immobilien Typ
// 	rsp_Klassifikation__c?: string; // Klassifikation
// 	rsp_Object_Owner_Email__c?: string; // Object Owner Email
// 	rsp_Object_Owner_Last_Name__c?: string; // Object Owner Last Name
// 	rsp_Object_Owner_Name__c?: string; // Object Owner Name
// 	rsp_Object_Owner_MobilePhone__c?: string; // rsp Object Owner MobilePhone
// 	rsp_Opportunity_CloseDate__c?: string; // Opportunity CloseDate
// 	rsp_Opportunity_CreatedDate__c?: string; // Opportunity CreatedDate
// 	rsp_Opportunity_Full_Address__c?: string; // Opportunity Full Address
// 	rsp_Opportunity_Stage__c?: string; // Opportunity Stage
// 	rsp_Order__c?: boolean; // Order?
// 	rsp_Qualifizierer__c?: string; // Qualifizierer
// 	rsp_Record_Age_in_hours__c?: number; // Record Age in hours
// 	rsp_RecordType_DeveloperName__c?: string; // RecordType DeveloperName
// 	rsp_Related_Opp_Record_Type__c?: string; // Related Opp Record Type
// 	rsp_Related_Sales_Process_CaseSafe_Id__c?: string; // Related Sales Process CaseSafe Id
// 	rsp_Contact_CaseSafe_Id__c?: string; // RSP Contact CaseSafe Id
// 	rsp_Contact_WA_Channel_Id__c?: string; // RSP Contact WA Channel Id
// 	rsp_RSP_Probability__c?: number; // RSP Probability
// 	rsp_RSP_CloseDate_LastMonth__c?: boolean; // RSP CloseDate LastMonth
// 	rsp_RSP_CloseDate_ThisMonth__c?: boolean; // RSP CloseDate ThisMonth
// 	rsp_RSP_CloseDate_ThisYear__c?: boolean; // RSP CloseDate ThisYear
// 	rsp_this_RSP_Stage_same_as_Opp_Stage__c?: boolean; // this RSP Stage same as Opp Stage
// 	rsp_Revenue_net__c?: number; // Revenue after Cancelation
// 	rsp_Wohnflaeche__c?: string; // Wohnflaeche

// 	// Picklist fields
// 	rsp_Contact_Type_Static__c?: string; // Contact Type Static
// 	rsp_Deal_probability__c?: string; // Deal probability
// 	rsp_Dealtype__c?: string; // Dealtype
// 	rsp_Digital_Product_Submission_Method__c?: string; // Digital Product Submission Method
// 	rsp_Digital_Product_who_get_docs__c?: string; // Digital Product who get docs
// 	rsp_Loss_Reason__c?: string; // Loss Reason
// 	rsp_RSP_LP_Loss_Reason__c?: string; // RSP - LP Loss Reason
// 	rsp_RSP_Monetization_Type__c?: string; // RSP Monetization Type
// 	rsp_RSP_Product_Type__c?: string; // Product Type
// 	rsp_RSP_Stage__c?: string; // RSP Stage
// 	rsp_Sipgate_Fax_Status__c?: string; // Sipgate Fax Status
// 	rsp_Timeline_for_contract_signing__c?: string; // Timeline for contract signing

// 	// Currency fields
// 	rsp_Canceled_Revenue__c?: number; // Canceled Revenue - Currency(16, 2)
// 	rsp_Contract_Price_per_Lead__c?: number; // Contract Price per Lead - Currency(16, 2)
// 	rsp_revenue__c?: number; // Revenue - Currency(16, 2)
// 	rsp_Revenue_Brutto__c?: number; // Revenue (Brutto) - Currency(16, 2)

// 	// Percent fields
// 	rsp_Contract_Revshare__c?: number; // Contract Revshare - Percent(16, 2)

// 	// Number fields
// 	rsp_Commission_net__c?: number; // Commission (net) - Number(18, 0)
// 	rsp_Contact_Count__c?: number; // Contact Count - Number(16, 2)
// 	rsp_Estimated_commission_net__c?: number; // Estimated commission (net) - Number(18, 0)
// 	rsp_Estimated_property_value__c?: number; // Estimated property value - Number(18, 0)
// 	rsp_Go_live_price__c?: number; // Go-live price - Number(18, 0)
// 	rsp_Owner_Feedbacks__c?: number; // Owner Feedbacks - Number(18, 0)
// 	rsp_Planned_start_price__c?: number; // Planned start price - Number(18, 0)

// 	// Date fields
// 	rsp_Contract_EndDate__c?: string; // Contract EndDate
// 	rsp_Contract_signing_date__c?: string; // Contract signing date
// 	rsp_Contract_StartDate__c?: string; // Contract StartDate
// 	rsp_Expected_Sales_Date__c?: string; // Erwarteter Schlusstermin
// 	rsp_Go_live_date__c?: string; // Go-live date
// 	rsp_Last_Feedback_Date__c?: string; // Last Feedback Date
// 	rsp_Next_Feedback_Date__c?: string; // Next Feedback Date
// 	rsp_Notary_Date__c?: string; // Notartermin
// 	rsp_On_site_appointment_held_on__c?: string; // On-site appointment held on
// 	rsp_On_site_appointment_planned_on__c?: string; // On-site appointment planned on
// 	rsp_Order_Date__c?: string; // Order Date
// 	rsp_Phone_appointment_held_on__c?: string; // Phone appointment held on
// 	rsp_Phone_appointment_planned_on__c?: string; // Phone appointment planned on
// 	rsp_Planned_go_live_date__c?: string; // Planned go-live date
// 	rsp_Sales_Date__c?: string; // Sales Date

// 	// Date/Time fields
// 	rsp_Date_of_cancellation__c?: string; // Date of cancellation
// 	rsp_Date_of_conversion__c?: string; // Date of conversion
// 	rsp_Sipgate_Fax_Submission_DateTime__c?: string; // Sipgate Fax Submission DateTime

// 	// Checkbox fields
// 	rsp_Forward_RSP_to_Contact__c?: boolean; // Forward RSP to Contact
// 	rsp_Hot_RSP__c?: boolean; // Hot RSP
// 	rsp_temp_skip_flow_execution__c?: boolean; // temp skip flow execution
// 	rsp_trigger_Digital_Valuation_Email__c?: boolean; // trigger Digital Valuation Email
// 	rsp_trigger_DP_Grundbuch_Fax__c?: boolean; // trigger DP Grundbuch Fax
// 	rsp_trigger_DP_Initial_Research_GPT__c?: boolean; // trigger DP Initial Research GPT
// 	rsp_trigger_DP_Submission_Doc_Creation__c?: boolean; // trigger DP Submission Doc Creation
// 	rsp_trigger_Pricehubble_DigitalValuation__c?: boolean; // trigger Pricehubble Digital Valuation
// 	trigger_update_contract_fields__c?: boolean; // trigger update contract fields
// 	temp_trigger_send_to_CERTA_API__c?: boolean; // temp trigger send to CERTA API
// 	temp_trigger_upcalculation_of_revenues__c?: boolean; // temp trigger upcalculation of revenues

// 	// Text fields
// 	rsp_Contract_Id__c?: string; // Contract Id - Text(18)
// 	rsp_Contract_Type__c?: string; // Contract Type - Text(255)
// 	rsp_Digital_Valuation_Attachment_ID__c?: string; // Digital Valuation Attachment ID - Text(255)
// 	rsp_DP_Grundbuchamt__c?: string; // DP Grundbuchamt - Text(255)
// 	rsp_DP_Grundbuchamt_Fax__c?: string; // DP Grundbuchamt Fax - Text(255)
// 	rsp_DP_Grundbuchamt_Postleitzahl__c?: string; // DP Grundbuchamt Postleitzahl - Text(255)
// 	rsp_DP_Grundbuchamt_Stadt__c?: string; // DP Grundbuchamt Stadt - Text(255)
// 	rsp_DP_Grundbuchamt_Strasse_Hausnummer__c?: string; // DP Grundbuchamt Straße & Hausnummer - Text(255)
// 	rsp_Digital_Product_Submission_Email__c?: string; // Digital Product Submission Email - Text(255)
// 	rsp_Digital_Product_Submission_Fax__c?: string; // Digital Product Submission Fax - Text(255)
// 	rsp_External_Partner_Lead_ID__c?: string; // External Partner Lead ID - Text(255) External ID
// 	rsp_Partner_Lead_Id__c?: string; // Partner Lead Id - Text(255)
// 	rsp_Related_Opp_Record_Type_Text__c?: string; // Related Opp Record Type (Text) - Text(255)
// 	rsp_Sipgate_Fax_sessionId__c?: string; // Sipgate Fax sessionId - Text(255)
// 	rsp_Slack_Message_ts__c?: string; // Slack Message ts - Text(255)
// 	rsp_stripe_payment_link__c?: string; // stripe payment link - Text(255)
// 	rsp_stripe_payment_link_id__c?: string; // stripe payment link id - Text(255)
// 	rsp_stripe_session_id__c?: string; // stripe session id - Text(255)

// 	// Text Area fields
// 	rsp_Loss_reason_details__c?: string; // Loss reason details - Text Area(255)

// 	// Long Text Area fields
// 	rsp_Protential_sale_blocker__c?: string; // Protential sale blocker - Long Text Area(5000)

// 	// Rich Text Area fields
// 	rsp_E_Mail_to_Contact_Storage__c?: string; // E-Mail to Contact Storage - Rich Text Area(131072)

// 	// URL fields
// 	rsp_Digital_Product_Submission_Document__c?: string; // Digital Product Submission Document - URL(255)
// 	rsp_Digital_Products_Google_Drive__c?: string; // Digital Products Google Drive - URL(255)
// 	rsp_Go_live_URL__c?: string; // Go-live URL - URL(255)
// 	rsp_Pricehubble_Digital_Valuation_PDF__c?: string; // Pricehubble Digital Valuation PDF - URL(255)

// 	// Long Text Area fields
// 	rsp_Go_live_URL_long__c?: string; // Go-live URL long - Long Text Area(3000)

// 	// Lookup fields
// 	rsp_Contact__c?: string; // Contact
// 	rsp_Opportunity__c?: string; // Opportunity

// 	// Text field (Required)
// 	Name?: string; // Related Sales Process Name - Text(80)
// }

/**
 * Update data types for Salesforce API operations
 */
// export type FeedbackUpdateData = Partial<
// 	Omit<FeedbackSF, "Id" | "CreatedById" | "LastModifiedById">
// >;
// export type RelatedSalesProcessUpdateData = Partial<
// 	Omit<RelatedSalesProcess, "Id" | "CreatedById" | "LastModifiedById">
// >;

/**
 * Common Salesforce API response types
 */
export interface SalesforceApiResponse {
	id?: string;
	success: boolean;
	errors?: Array<{
		message: string;
		errorCode: string;
		fields?: string[];
	}>;
}

export interface SalesforceQueryResponse<T> {
	totalSize: number;
	done: boolean;
	records: T[];
	nextRecordsUrl?: string;
}

/**
 * Lead Salesforce Object
 */

export interface Lead extends SalesforceRecord {
	// Standard fields
	Name?: string;
	Salutation?: string; // Picklist
	FirstName?: string;
	LastName?: string;
	Company?: string;
	Title?: string;
	Email?: string;
	Phone?: string;
	MobilePhone?: string;
	Fax?: string;
	Website?: string;
	Description?: string;
	LeadSource?: string; // Picklist
	PostalCode?: string;
	Status?: string; // Picklist
	Industry?: string; // Picklist
	Rating?: string; // Picklist
	AnnualRevenue?: number;
	NumberOfEmployees?: number;
	DoNotCall?: boolean;
	HasOptedOutOfEmail?: boolean;
	HasOptedOutOfFax?: boolean;
	Jigsaw?: string;
	LastTransferDate?: string;
	GenderIdentity?: string; // Picklist
	Pronouns?: string; // Picklist

	// Custom fields
	lead_Anzahl_Einheiten__c?: number;
	Address?: string;
	lead_Aktueller_Bodenrichtwert__c?: number;
	lead_Aktuelles_Unternehmen__c?: string;
	lead_Other_special_feature__c?: string;
	gender__c?: string; // Picklist
	Anrede__c?: string;
	lead_Assigned_active_brokers__c?: number;
	lead_Assigned_active_brokers_now__c?: number;
	lead_Assigned_active_Gutachter__c?: number;
	lead_Assigned_active_Gutachter_now__c?: number;
	lead_Assigned_active_lead_partner_at_reg__c?: number;
	lead_Assigned_active_lead_partner_now__c?: number;
	Auf_Mailbox_gesprochen__c?: boolean;
	lead_Auto_Lead_Assignment_Qualifizierer__c?: string;
	leadAverage_BRW_this_ZIP_code__c?: number;
	lead_Average_Bodenrichtwert__c?: number;
	lead_Baujahr_der_Immobilie__c?: string;
	lead_Bereits_an_Makler_weitergeleitet__c?: boolean;
	lead_Besondere_Merkmale_der_Immobilie__c?: string;
	lead_Best_Availability__c?: string;
	Bewertungshintergrund_Detail__c?: string;
	lead_Broker_constraints_met__c?: boolean;
	lead_BRW_from_API__c?: number;
	lead_classification_criteria__c?: string;
	lead_Close_Call_GPT_Analyse__c?: string;
	lead_Covered_at_registration__c?: boolean;
	lead_Covered_by_broker_now__c?: boolean;
	lead_Gutachter_covered_at_registration__c?: boolean;
	lead_Covered_by_Gutachter_now__c?: boolean;
	lead_Covered_by_lead_partner_at_reg__c?: boolean;
	lead_Covered_by_lead_partner_now__c?: boolean;
	lead_CPL__c?: number;
	lead_Customer_Company__c?: string;
	lead_Customer_Type__c?: string; // Picklist
	lead_Datetime_Weiterleitung__c?: string;
	lead_Digital_Products__c?: string; // Picklist (Multi-Select)
	lead_Digital_Products_Google_Drive__c?: string;
	lead_bought_Digital_Valuation__c?: boolean;
	lead_Dummy_Lead__c?: boolean;
	lead_Earliest_Next_Call_DateTime__c?: string;
	lead_Location__c?: string;
	lead_Loss_Reason__c?: string; // Picklist
	lead_Make_Submission_DateTime__c?: string;
	lead_Makler__c?: string;
	lead_Maklerinfo_Transkript__c?: string;
	Manual_Forward_to_Aroundhome__c?: string;
	Flurstuecknenner__c?: string;
	lead_gbraid_c__c?: string;
	lead_gclid__c?: string;
	lead_Gemarkung_Gemeinde__c?: string;
	lead_Geolocation__Latitude__s?: number;
	lead_Geolocation__Longitude__s?: number;
	lead_GEZ__c?: string;
	lead_GFZ__c?: string;
	lead_immobilien_typ_detail__c?: string; // Picklist
	lead_Grundstuecksflaeche__c?: string;
	lead_GRZ__c?: string;
	lead_GutachterConstraintsMet__c?: boolean;
	lead_Gutachterausschuss_BRW__c?: string;
	wants_gutachterbewertung__c?: boolean;
	lead_Property_rented__c?: string; // Picklist
	lead_Property_rented_Since_year__c?: number;
	lead_Immobilien_Typ__c?: string; // Picklist
	lead_Individual_Upselling_Email__c?: string;
	lead_Individual_Upselling_Email_HTML__c?: string;
	lead_is_owner__c?: string; // Picklist
	Kaufhorizont__c?: string; // Picklist
	lead_Klassifikation__c?: string; // Picklist
	lead_Landkreis__c?: string;
	lead_Last_Aircall_Transcription__c?: string;
	lead_currently_blocked_by_agent__c?: boolean;
	lead_Lead_Id_Partner__c?: string;
	lead_lead_page__c?: string;
	lead_Lead_Parent__c?: string;
	lead_Lead_Partner__c?: string;
	lead_Lead_Partner_API_Response__c?: string;
	lead_LeadPartnerConstraintsMet__c?: boolean;
	lead_Lead_Type__c?: string; // Picklist
	lead_intention_appraisal_confirmation__c?: boolean;
	utm_extensionid__c?: string;
	lead_Flur__c?: string;
	lead_Flur_Blattnummer__c?: string;
	lead_Flurstueck__c?: string;
	Partner_Lead_Id__c?: string;
	lead_Planned_next_step__c?: string; // Picklist
	lead_Pricehubble_Dossier_ID__c?: string;
	lead_Pricehubble_valuation_requested__c?: boolean;
	lead_Property_City__c?: string;
	lead_Stadt__c?: string;
	lead_Property_Postal_Code__c?: string;
	lead_Property_Street_Housenumber__c?: string;
	int_process_number__c?: string;
	lead_Qualifizierer__c?: string;
	lead_Remove_pending_actions__c?: boolean;
	lead_Requirements_Legitimate_Interest__c?: string; // Picklist
	lead_Requirements_Purpose__c?: string; // Picklist
	rudderstack_anon_id__c?: string;
	lead_rs_session_id_c__c?: string;
	lead_Divorce__c?: string; // Picklist
	lead_Speculation_period_ends_in_year__c?: number;
	lead_Source__c?: string;
	lead_Stadtteil__c?: string;
	lead_Stichtag_BRW_from_API__c?: string;
	lead_stripe_payment_intent_id__c?: string;
	lead_stripe_session_id__c?: string;
	lead_temp_skip_recordtriggered_flows__c?: boolean;
	Testing_and_Q_A__c?: string;
	lead_Top_Lead__c?: string; // Picklist
	lead_TriggerCheckbox__c?: boolean;
	lead_trig_Digital_Valuation_Conversion__c?: boolean;
	lead_Unsettled_land_register_situation__c?: string; // Picklist
	lead_url_conversion__c?: string;
	url_first_page__c?: string;
	lead_User_agreement__c?: boolean;
	lead_utm_aceid__c?: string;
	lead_utm_adid__c?: string;
	lead_utm_agid__c?: string;
	lead_utm_campaign__c?: string;
	lead_utm_channel__c?: string;
	lead_utm_cid__c?: string;
	lead_utm_content__c?: string;
	lead_utm_dev__c?: string;
	lead_utm_devicemodel__c?: string;
	lead_utm_feeditemid__c?: string;
	lead_utm_googleplaceid__c?: string;
	lead_utm_loc__c?: string;
	lead_utm_medium__c?: string;
	lead_utm_mt__c?: string;
	lead_utm_nw__c?: string;
	lead_utm_physicalcity__c?: string;
	lead_utm_physicalcountry__c?: string;
	lead_utm_placement__c?: string;
	lead_utm_position__c?: string;
	lead_utm_source__c?: string;
	lead_utm_target__c?: string;
	lead_utm_targetid__c?: string;
	lead_utm_term__c?: string;
	lead_valuation_pricehubble_confidence__c?: string; // Picklist
	lead_valuation_pricehubble_max_value__c?: number;
	lead_valuation_pricehubble_min_value__c?: number;
	lead_valuation_pricehubble_value__c?: number;
	Verkaufshorizont__c?: string; // Picklist
	lead_wbraid_c__c?: string;
	lead_Weiterleitungsmethode__c?: string; // Picklist
	lead_With_real_estate__c?: string; // Picklist
	lead_Wohnflaeche__c?: string;
	lead_Right_of_residence_right_ofusufruct__c?: string; // Picklist
	lead_zipStorageAvailable__c?: boolean;
	lead_Zustand_der_Immobilie__c?: string; // Picklist
	intention_wants_energy_consultation__c?: boolean;
	property_energy_class__c?: string; // Picklist
	lead_Inheritance__c?: string; // Picklist
	lead_Inheritance_Number_of_heirs__c?: string; // Picklist
	lead_Inheritance_tax_due_soon__c?: string; // Picklist
	lead_Lack_of_building_permits__c?: string; // Picklist
	wants_maklerbewertung__c?: boolean;
	lead_score_at_registration__c?: number;
	City: string;
	Street: string;

	valuation_sqm__c?: number;
	valuation_total__c?: number;
	valuation_type__c?: string; // Picklist
	// Note: CreatedDate is a read-only system field and cannot be set via API
}
