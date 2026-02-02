export interface ParsedAddressType {
	streetName: string;
	houseNumber: string;
	postalCode: string;
	city: string;
	state: string;
	country: string;
	latitude: number;
	longitude: number;
}

export default function parseAddress(
	place: google.maps.places.PlaceResult | google.maps.GeocoderResult,
): ParsedAddressType {
	let streetName = "";
	let houseNumber = "";
	let postalCode = "";
	let city = "";
	let state = "";
	let country = "";
	let latitude = 0;
	let longitude = 0;

	if (place.address_components) {
		for (const component of place.address_components) {
			const componentType = component.types[0];

			switch (componentType) {
				case "street_number":
					houseNumber = component.long_name;
					break;
				case "route":
					streetName = component.long_name;
					break;
				case "postal_code":
					postalCode = component.long_name;
					break;
				case "locality":
					city = component.long_name;
					break;
				case "administrative_area_level_1":
					state = component.long_name;
					break;
				case "country":
					country = component.long_name;
					break;
			}
		}
	}

	if (place.geometry?.location) {
		latitude = place.geometry.location.lat();
		longitude = place.geometry.location.lng();
	}

	return {
		streetName,
		houseNumber,
		postalCode,
		city,
		state,
		country,
		latitude,
		longitude,
	};
}
