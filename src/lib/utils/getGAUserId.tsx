export default function getGAUserId(document: Document = window.document) {
	const array = document.cookie.split("; ");
	const gaCookie = array.find((cookie) => cookie.startsWith("_ga="));
	// Extract the part after GA1.1
	if (gaCookie) {
		const gaValueParts = gaCookie.split("GA1.1.");
		if (gaValueParts.length > 1) {
			return gaValueParts[1];
		}
	}
	return null;
}
