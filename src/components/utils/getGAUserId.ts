export default function getGAUserId(): string | null {
	if (typeof window === "undefined") return null;

	try {
		// Try to get GA client ID from cookie
		const gaCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("_ga="));

		if (gaCookie) {
			const gaValue = gaCookie.split("=")[1];
			// GA cookie format: GA1.1.XXXXXXXXXX.XXXXXXXXXX
			const parts = gaValue?.split(".");
			if (parts && parts.length >= 4) {
				return `${parts[2]}.${parts[3]}`;
			}
		}
	} catch (e) {
		console.error("Error getting GA user ID:", e);
	}

	return null;
}
