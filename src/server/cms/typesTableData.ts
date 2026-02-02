import type { Slug } from "./typesLowLevel";

////// BARCHART ////////
export interface BarChartType {
	name: string;
	bodenrichtwert: number;
	order: number;
}

/////// CITIES WITH DISTRICTS //////
export interface Subdistrict {
	name: string;
	slug: string;
	min: number;
	max: number;
	avg: number;
	median: number;
	currentAvg: number;
	lastYearAvg: number;
	change: number;
	_key: string;
}

export interface CitiesWithDistricts {
	highLevel: string;
	highLevelSlug: string;
	subdistrict: Subdistrict[];
	_key: string;
}

////// DISTRICTS IN SAME CITY ///////
export interface DistrictsInSameCity {
	rank: number;
	district: string;
	slug: Slug;
	min: number;
	max: number;
	avg: number;
	lastYearAvg: number;
	median: number;
	uneven: boolean;
	_key: string;
	gew_min: number;
	gew_max: number;
	gew_median: number;
	gew_avg: number;
	forst_min: number;
	forst_max: number;
	forst_median: number;
	forst_avg: number;
	land_min: number;
	land_max: number;
	land_median: number;
	land_avg: number;
	distance: number;
	full_slug: string;
}

/////// HISTORICAL PRICE ///////
export interface HistoricalPrice {
	bodenrichtwert: number;
	year: string;
}

//// PLZ INFO //////
export interface PlzInfo {
	district: string;
	rank: number;
	plz: string;
	min: number;
	avg: number;
	avgLastYear: number;
	change: number;
	max: number;
	median: number;
	uneven: boolean;
	_key: string;
}

export interface SpecialCity {
	order: number;
	city: string;
	citySlug: string;
	avg: number;
	median: number;
	change: number;
	_key: string;
}

export interface Street {
	name: string;
	min: number;
	max: number;
	_key: string;
}

export interface StreetsGroupedLetter {
	letter: string;
	streets: Street[];
	_key: string;
}

export interface RealEstatePrice {
	index: number;
	year: number;
	quarter: number;
	avg: number;
	avgLastYear: number;
	change: number;
	changeYear: number;
	min: number;
	max: number;
	label: string;
	prevQuarter: string;
	prevYear: string;
}

export interface NeighboringPrices {
	apartment_buy_avg: number;
	apartment_buy_max: number;
	apartment_buy_min: number;
	apartment_buy_avg_last_year: number;
	apartment_buy_avg_last_quarter: number;
	apartment_buy_change_last_year: number;
	apartment_buy_change_last_quarter: number;

	apartment_rent_avg: number;
	apartment_rent_max: number;
	apartment_rent_min: number;
	apartment_rent_avg_last_year: number;
	apartment_rent_avg_last_quarter: number;
	apartment_rent_change_last_year: number;
	apartment_rent_change_last_quarter: number;

	house_buy_avg: number;
	house_buy_max: number;
	house_buy_min: number;
	house_buy_avg_last_year: number;
	house_buy_avg_last_quarter: number;
	house_buy_change_last_year: number;
	house_buy_change_last_quarter: number;

	house_rent_avg: number;
	house_rent_max: number;
	house_rent_min: number;
	house_rent_avg_last_year: number;
	house_rent_avg_last_quarter: number;
	house_rent_change_last_year: number;
	house_rent_change_last_quarter: number;
}
export interface NeighboringCityPrices extends NeighboringPrices {
	distance: number;
	slug: string;
	full_slug: string;
	city: string;
}

export interface NeighboringDistrictPrices extends NeighboringPrices {
	distance: number;
	district: string;
	slug: string;
	full_slug: string;
}
