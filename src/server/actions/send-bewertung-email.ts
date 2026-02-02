import { MUTATIONS } from "@/server/db/queries";

const API_URL = "https://hlrealestate.de/api/send-bewertung";
// const API_URL = "http://localhost:3001/api/send-bewertung";

export interface LeadEmailData {
	id: number;
	user_salutation: string | null;
	user_lastname: string | null;
	user_email: string | null;
	property_address: string | null;
	property_postalcode: string | null;
	property_city: string | null;
	property_type: string | null;
	property_type_details: string | null;
	property_living_area: number | null;
	property_plot_area: number | null;
	property_state: string | null;
	price_sqm: number | null;
	valuation: number | null;
	valuation_source: string | null;
	domain: string | null;
	request_reason: string | null;
}

export interface SendBewertungsEmailOptions {
	overrideEmail?: string;
	dryRun?: boolean;
	skipDbUpdate?: boolean;
	verbose?: boolean;
}

export interface SendBewertungsEmailResult {
	success: boolean;
	emailId?: string;
	error?: string;
}

export async function sendBewertungsEmail(
	lead: LeadEmailData,
	options: SendBewertungsEmailOptions = {},
): Promise<SendBewertungsEmailResult> {
	const {
		overrideEmail,
		dryRun = false,
		skipDbUpdate = false,
		verbose = false,
	} = options;

	// Determine which email to use
	const targetEmail = overrideEmail || lead.user_email || "";

	// Prepare the data for the API
	const emailData = {
		salutation: lead.user_salutation,
		lastname: lead.user_lastname,
		address: lead.property_address,
		postalCode: lead.property_postalcode,
		city: lead.property_city,
		propertyType: lead.property_type,
		propertyTypeDetail: lead.property_type_details,
		propertyLivingArea: lead.property_living_area,
		propertyPlotArea: lead.property_plot_area,
		propertyState: lead.property_state,
		pricePerSqm: lead.price_sqm,
		valuation: lead.valuation,
		valuationSource: lead.valuation_source,
		leadSource: lead.domain,
		showUpsell: false,
		email: targetEmail,
	};

	// Log email data only when verbose or dry run
	if (verbose || dryRun) {
		console.log(
			dryRun
				? "[DRY RUN] Would send email with data:"
				: "Sending email with data:",
			emailData,
		);
	}

	if (dryRun) {
		return { success: true };
	}

	try {
		// Send the request to the API
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.API_SECRET_KEY || "",
			},
			body: JSON.stringify(emailData),
		});

		const data = await response.json();

		if (response.ok && data.success) {
			// Save the email ID and timestamp to the leads table
			if (data.data?.id && !skipDbUpdate) {
				await MUTATIONS.updateLeadEmailTracking(lead.id, data.data.id);
			}
			return { success: true, emailId: data.data?.id };
		} else {
			// Save the error to the database
			const errorMessage =
				data.error || data.message || "Unknown error occurred";
			if (!skipDbUpdate) {
				await MUTATIONS.updateLeadEmailError(lead.id, errorMessage);
			}
			return { success: false, error: errorMessage };
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		if (!skipDbUpdate) {
			await MUTATIONS.updateLeadEmailError(lead.id, errorMessage);
		}
		return { success: false, error: errorMessage };
	}
}
