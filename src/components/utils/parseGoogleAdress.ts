interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

export interface ParsedAddress {
	streetName: string;
	houseNumber: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	latitude: number | null;
	longitude: number | null;
}

export function parseGoogleAddress(
	addressComponents: AddressComponent[],
	geometry?: { location: { lat: () => number; lng: () => number } },
): ParsedAddress {
	const result: ParsedAddress = {
		streetName: "",
		houseNumber: "",
		city: "",
		state: "",
		country: "",
		postalCode: "",
		latitude: geometry?.location?.lat() ?? null,
		longitude: geometry?.location?.lng() ?? null,
	};

	for (const component of addressComponents) {
		const types = component.types;

		if (types.includes("route")) {
			result.streetName = component.long_name;
		} else if (types.includes("street_number")) {
			result.houseNumber = component.long_name;
		} else if (types.includes("locality")) {
			result.city = component.long_name;
		} else if (types.includes("administrative_area_level_1")) {
			result.state = component.long_name;
		} else if (types.includes("country")) {
			result.country = component.long_name;
		} else if (types.includes("postal_code")) {
			result.postalCode = component.long_name;
		}
	}

	return result;
}

export default parseGoogleAddress;

// Type alias for backwards compatibility
export type ParsedAddressType = ParsedAddress;
