"use server";

export async function getSalesforceToken(): Promise<string> {
	const url = "https://login.salesforce.com/services/oauth2/token";

	const bodyData = {
		grant_type: "password",
		client_id:
			"3MVG9XLfsJ3MQLvzg2UIzkYGneHweCiCq6ivxtlKHsL9Hyz.eoer9.ozy9lVyevuyYnCkE9s3H3BT6L0NbjYZ",
		client_secret:
			"228ECA4F1382DAD8038445E74424C378A0A825DF0C26FA872953E95A02E99296",
		username: "info+integration@bodenrichtwerte-deutschland.de",
		password: "QRP2ugy*ndw6gmn3hmwUCfKaOCLJsvM1WRpun8Dmnagx",
	};
	try {
		// Make the POST request to Salesforce
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams(bodyData).toString(),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Failed to authenticate with Salesforce: ${response.status} ${errorText}`,
			);
		}

		const data = await response.json();
		return data.access_token;
	} catch (error) {
		console.error("Salesforce authentication error:", error);
		throw error;
	}
}
