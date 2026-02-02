export interface BrwValueItem {
	brw: number | null;
	gutachterausschuss: string;
	stichtag: string;
}

export type BrwValue = BrwValueItem[];

export async function getBrwValue(
	lat: number,
	lng: number,
): Promise<BrwValue | null> {
	// Stub implementation - replace with actual API call
	console.log(`getBrwValue called with lat: ${lat}, lng: ${lng}`);
	return null;
}

export default getBrwValue;
