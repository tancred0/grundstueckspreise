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

// Overload signatures
export function parseGoogleAddress(
	place: google.maps.places.PlaceResult | google.maps.GeocoderResult,
): ParsedAddress;
export function parseGoogleAddress(
	addressComponents: AddressComponent[],
	geometry?: { location: { lat: () => number; lng: () => number } },
): ParsedAddress;

// Implementation
export function parseGoogleAddress(
	placeOrComponents:
		| google.maps.places.PlaceResult
		| google.maps.GeocoderResult
		| AddressComponent[]
		| null
		| undefined,
	geometry?: { location: { lat: () => number; lng: () => number } },
): ParsedAddress {
	const result: ParsedAddress = {
		streetName: "",
		houseNumber: "",
		city: "",
		state: "",
		country: "",
		postalCode: "",
		latitude: null,
		longitude: null,
	};

	// Debug logging
	console.log("[parseGoogleAddress] Input type:", typeof placeOrComponents);
	console.log("[parseGoogleAddress] Input value:", placeOrComponents);
	console.log("[parseGoogleAddress] Is Array:", Array.isArray(placeOrComponents));

	// Handle null/undefined
	if (!placeOrComponents) {
		console.warn("[parseGoogleAddress] Received null/undefined input");
		return result;
	}

	let addressComponents: AddressComponent[] | undefined;
	let locationGetter: { lat: () => number; lng: () => number } | undefined;

	// Determine if we received a place object or an array of components
	if (Array.isArray(placeOrComponents)) {
		// Direct array of address components
		addressComponents = placeOrComponents;
		locationGetter = geometry?.location;
		console.log("[parseGoogleAddress] Detected: array of components");
	} else if (typeof placeOrComponents === "object") {
		// Place object (PlaceResult or GeocoderResult)
		const place = placeOrComponents as
			| google.maps.places.PlaceResult
			| google.maps.GeocoderResult;
		addressComponents = place.address_components as AddressComponent[] | undefined;
		locationGetter = place.geometry?.location as
			| { lat: () => number; lng: () => number }
			| undefined;
		console.log("[parseGoogleAddress] Detected: place object");
		console.log("[parseGoogleAddress] address_components:", place.address_components);
		console.log("[parseGoogleAddress] geometry:", place.geometry);
	} else {
		console.warn("[parseGoogleAddress] Unexpected input type:", typeof placeOrComponents);
		return result;
	}

	// Extract coordinates
	if (locationGetter) {
		try {
			result.latitude =
				typeof locationGetter.lat === "function"
					? locationGetter.lat()
					: (locationGetter.lat as unknown as number);
			result.longitude =
				typeof locationGetter.lng === "function"
					? locationGetter.lng()
					: (locationGetter.lng as unknown as number);
			console.log("[parseGoogleAddress] Extracted coordinates:", result.latitude, result.longitude);
		} catch (e) {
			console.warn("[parseGoogleAddress] Error extracting coordinates:", e);
		}
	}

	// Guard against non-iterable address_components
	if (!addressComponents || !Array.isArray(addressComponents)) {
		console.warn("[parseGoogleAddress] address_components is not iterable:", addressComponents);
		return result;
	}

	console.log("[parseGoogleAddress] Processing", addressComponents.length, "address components");

	// Parse address components
	for (const component of addressComponents) {
		if (!component || !component.types) {
			console.warn("[parseGoogleAddress] Invalid component:", component);
			continue;
		}

		const types = component.types;
		console.log("[parseGoogleAddress] Component:", component.long_name, "Types:", types);

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

	console.log("[parseGoogleAddress] Final result:", result);
	return result;
}

export default parseGoogleAddress;

// Type alias for backwards compatibility
export type ParsedAddressType = ParsedAddress;
