import type { CityData, DistrictData, StateData } from "./types";

export function isCityData(data: any): data is CityData {
	return "cityName" in data && !("districtName" in data);
}

export function isStateData(data: any): data is StateData {
	return "stateName" in data && !("cityName" in data);
}

export function isDistrictData(data: any): data is DistrictData {
	return "districtName" in data;
}
