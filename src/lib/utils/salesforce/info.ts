"use server";

import { getSalesforceToken } from "./token";

export interface AdminPanelData {
	ap_Grundstuecksflaechentyp__c: string[];
	ap_Klassifikation__c: string[];
	ap_Verkaufshorizont__c: string[];
	ap_Is_Owner__c: string[];
	ap_Lead_Source__c: string[];
}

const variantIds = {
	paid: "a0qbi000007CsC5AAK",
	organic: "a0qbi000007CqOhAAK",
};

const ADMIN_PANEL_KEYS = [
	"ap_Grundstuecksflaechentyp__c",
	"ap_Klassifikation__c",
	"ap_Verkaufshorizont__c",
	"ap_Is_Owner__c",
] as const;

export async function getSalesforceInfo(
	variant: "paid" | "organic" = "organic",
): Promise<AdminPanelData> {
	const token = await getSalesforceToken();

	const url = `https://site-inspiration-4697.my.salesforce.com/services/data/v59.0/sobjects/Admin_Panel__c/${variantIds[variant]}`;

	try {
		// Make the POST request to Salesforce
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Failed to authenticate with Salesforce: ${response.status} ${errorText}`,
			);
		}

		const data = await response.json();
		// just for the keys in AdminPanelData, split the values based on the ";"
		const returnData = {} as AdminPanelData;
		for (const key in data) {
			if (ADMIN_PANEL_KEYS.includes(key as any)) {
				returnData[key as keyof AdminPanelData] = await splitValues(data[key]);
			}
		}

		return returnData;
	} catch (error) {
		console.error("Salesforce authentication error:", error);
		throw error;
	}
}

const splitValues = (value: string) => {
	return value.split(";");
};
