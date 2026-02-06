import type { CityData, DistrictData, StateData } from "./types";

export function isCityData(data: any): data is CityData {
	return data != null && "cityName" in data && !("districtName" in data);
}

export function isStateData(data: any): data is StateData {
	return data != null && "stateName" in data && !("cityName" in data);
}

export function isDistrictData(data: any): data is DistrictData {
	return data != null && "districtName" in data;
}
