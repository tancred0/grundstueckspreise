import { getSalesforceToken } from "./auth";
import type { Lead, SalesforceApiResponse } from "./types";

/**
 * Salesforce API client for handling Related Sales Process and Feedback operations
 */
export class SalesforceClient {
	private baseUrl: string;

	constructor(instanceUrl = "https://site-inspiration-4697.my.salesforce.com") {
		this.baseUrl = `${instanceUrl}/services/data/v59.0`;
	}

	/**
	 * Updates a Related Sales Process record (PATCH operation)
	 * @param recordId - The Salesforce RSP record ID
	 * @param updateData - Fields to update with proper typing
	 */
	// async updateRSP(
	// 	recordId: string,
	// 	updateData: RelatedSalesProcessUpdateData,
	// ): Promise<void> {
	// 	const token = await getSalesforceToken();
	// 	const url = `${this.baseUrl}/sobjects/Related_Sales_Process__c/${recordId}`;

	// 	console.log("[DEBUG] SF PATCH request:", {
	// 		operation: "updateRSP",
	// 		recordId,
	// 		updateData,
	// 		timestamp: new Date().toISOString(),
	// 	});

	// 	try {
	// 		const response = await fetch(url, {
	// 			method: "PATCH",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			body: JSON.stringify(updateData),
	// 		});

	// 		if (!response.ok) {
	// 			const errorText = await response.text();
	// 			console.error("[ERROR] SF PATCH failed:", {
	// 				status: response.status,
	// 				recordId,
	// 				errorText,
	// 			});
	// 			throw new Error(
	// 				`Failed to update Related Sales Process: ${response.status} ${errorText}`,
	// 			);
	// 		}

	// 		console.log("[DEBUG] SF PATCH successful:", {
	// 			operation: "updateRSP",
	// 			recordId,
	// 			status: response.status,
	// 		});
	// 	} catch (error) {
	// 		console.error("[ERROR] SF PATCH error:", {
	// 			recordId,
	// 			error: error instanceof Error ? error.message : String(error),
	// 		});
	// 		throw error;
	// 	}
	// }

	/**
	 * Updates a Lead record (PATCH operation)
	 * @param recordId - The Salesforce Lead record ID
	 * @param updateData - Fields to update
	 */
	async updateLead(recordId: string, updateData: Partial<Lead>): Promise<void> {
		const token = await getSalesforceToken();
		const url = `${this.baseUrl}/sobjects/Lead/${recordId}`;

		try {
			const response = await fetch(url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("[ERROR] SF PATCH failed:", {
					status: response.status,
					recordId,
					errorText,
				});
				throw new Error(
					`Failed to update Lead: ${response.status} ${errorText}`,
				);
			}
		} catch (error) {
			console.error("[ERROR] SF PATCH error:", {
				recordId,
				error: error instanceof Error ? error.message : String(error),
			});
			throw error;
		}
	}

	/**
	 * Creates a new Lead record (POST operation)
	 * @param leadData - Lead data with proper typing
	 * @returns The created record ID
	 */
	async createLead(leadData: Partial<Lead>): Promise<string> {
		const token = await getSalesforceToken();
		const url = `${this.baseUrl}/sobjects/Lead`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(leadData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("[ERROR] SF POST failed:", {
					status: response.status,
					errorText,
				});
				throw new Error(
					`Failed to create Lead: ${response.status} ${errorText}`,
				);
			}

			const result: SalesforceApiResponse = await response.json();

			if (!result.success || !result.id) {
				console.error("[ERROR] SF POST response invalid:", {
					result,
				});
				throw new Error(
					`Failed to create Lead: ${JSON.stringify(result.errors)}`,
				);
			}

			return result.id;
		} catch (error) {
			console.error("[ERROR] SF POST error:", {
				error: error instanceof Error ? error.message : String(error),
			});
			throw error;
		}
	}

	/**
	 * Creates a new Feedback record (POST operation)
	 * @param feedbackData - Feedback data with proper typing
	 * @returns The created record ID
	 */
	// async createFeedback(feedbackData: FeedbackUpdateData): Promise<string> {
	// 	const token = await getSalesforceToken();
	// 	const url = `${this.baseUrl}/sobjects/Feedback__c`;

	// 	console.log("[DEBUG] SF POST request:", {
	// 		operation: "createFeedback",
	// 		feedbackData,
	// 		timestamp: new Date().toISOString(),
	// 	});

	// 	try {
	// 		const response = await fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			body: JSON.stringify(feedbackData),
	// 		});

	// 		if (!response.ok) {
	// 			const errorText = await response.text();
	// 			console.error("[ERROR] SF POST failed:", {
	// 				status: response.status,
	// 				errorText,
	// 			});
	// 			throw new Error(
	// 				`Failed to create Feedback: ${response.status} ${errorText}`,
	// 			);
	// 		}

	// 		const result: SalesforceApiResponse = await response.json();

	// 		if (!result.success || !result.id) {
	// 			console.error("[ERROR] SF POST response invalid:", {
	// 				result,
	// 			});
	// 			throw new Error(
	// 				`Failed to create Feedback: ${JSON.stringify(result.errors)}`,
	// 			);
	// 		}

	// 		console.log("[DEBUG] SF POST successful:", {
	// 			operation: "createFeedback",
	// 			feedbackId: result.id,
	// 			status: response.status,
	// 		});
	// 		return result.id;
	// 	} catch (error) {
	// 		console.error("[ERROR] SF POST error:", {
	// 			error: error instanceof Error ? error.message : String(error),
	// 		});
	// 		throw error;
	// 	}
	// }
}

// Export a singleton instance for convenience
export const salesforceClient = new SalesforceClient();
