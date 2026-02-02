import { getSalesforceInfo } from "./info";

export async function shouldShowBRW({
	request_reason,
	property_detail_type,
	sales_horizon,
	owner_status,
	lead_source,
}: {
	request_reason: string; //'Anderer Zweck' | 'Immobilienverkauf' | 'Erbe oder Schenkung',
	property_detail_type: string; //'Wohnbau' | 'Gewerbe' | 'Sonstiges' | 'Wohn- und Geschäftshaus' | 'Bürogebäude' | 'Logistik-/Industriegebäude' | 'Einfamilienhaus' | 'Mehrfamilienhaus' | 'Bauland' | 'Wohnung',
	sales_horizon: string; //'1-3 Monate' | '4-6 Monate' | '6-12 Monate' | '12 Monate oder später' | 'Unsicher',
	owner_status: string; //'yes' | 'part-owner' | 'relative',
	lead_source: "organic" | "paid";
}): Promise<boolean> {
	// Check if required fields exist
	const currentSalesInfo = await getSalesforceInfo(lead_source);

	// console.log("currentSalesInfo", currentSalesInfo);
	// console.log("request_reason", request_reason);
	// console.log("property_detail_type", property_detail_type);
	// console.log("sales_horizon", sales_horizon);
	// console.log("owner_status", owner_status);

	// console.log("currentSalesInfo.ap_Klassifikation__c", currentSalesInfo.ap_Klassifikation__c.includes(request_reason));
	// console.log("currentSalesInfo.ap_Grundstuecksflachentyp__c", currentSalesInfo.ap_Grundstuecksflaechentyp__c.includes(property_detail_type));
	// console.log("currentSalesInfo.ap_Is_Owner__c", currentSalesInfo.ap_Is_Owner__c.includes(owner_status));

	const isMatch =
		currentSalesInfo.ap_Klassifikation__c.includes(request_reason) &&
		currentSalesInfo.ap_Grundstuecksflaechentyp__c.includes(
			property_detail_type,
		) &&
		currentSalesInfo.ap_Is_Owner__c.includes(owner_status);

	if (request_reason === "Immobilienverkauf") {
		return !(
			isMatch && currentSalesInfo.ap_Verkaufshorizont__c.includes(sales_horizon)
		);
	} else {
		return !isMatch;
	}
}
