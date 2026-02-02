export interface CoverageResult {
	isCovered: boolean;
	activeCoverage: boolean;
	region?: string;
	availableFrom?: string;
}

export async function getCoverage(
	postalCode: string,
): Promise<CoverageResult> {
	// Stub implementation - replace with actual API call
	console.log(`getCoverage called with postalCode: ${postalCode}`);
	return {
		isCovered: true,
		activeCoverage: true,
	};
}

export default getCoverage;
