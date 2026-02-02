export interface ZipCodeBrwResult {
	zipCode: string;
	averageBrw: number;
	minBrw?: number;
	maxBrw?: number;
	year: number;
}

export async function getZipCodeBrw(
	zipCode: string,
): Promise<ZipCodeBrwResult | null> {
	// Stub implementation - replace with actual API call
	console.log(`getZipCodeBrw called with zipCode: ${zipCode}`);
	return null;
}

export default getZipCodeBrw;
