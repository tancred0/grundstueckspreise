"use server";

export async function getSalesforceToken(): Promise<string> {
	const url = "https://login.salesforce.com/services/oauth2/token";

	const password = "qjn_tjv1agw8KFG2hnz";
	const token = "KGjrFlym9QXosqpRJi4ZuJrQB";

	const bodyData = {
		grant_type: "password",
		client_id:
			"3MVG9XLfsJ3MQLvzg2UIzkYGneNc5j1Mng9cLTX.UMfrGRgpJLk4M648nY2_ROaU5dwhf15Wu2mNHnZI_UInh",
		client_secret:
			"1FDC155E672D6F487C770B55A3519E2D0D79BC7A0A8D611B3FAC8A3967D9049D",
		username: "info+integration@bodenrichtwerte-deutschland.de",
		password: password + token,
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
