import type {
	AddSection,
	BlockContent,
	CityReference,
	ContactDetailType,
	Faq,
	GutachterInfo,
	OpeningTimePerDay,
	Rating,
	Reference,
	RelatedCitiesReference,
	Seo,
	SeowithPrio,
	Slug,
} from "@/server/cms/typesLowLevel";

import type {
	BarChartType,
	CitiesWithDistricts,
	DistrictsInSameCity,
	HistoricalPrice,
	NeighboringCityPrices,
	NeighboringDistrictPrices,
	PlzInfo,
	RealEstatePrice,
	SpecialCity,
	StreetsGroupedLetter,
} from "@/server/cms/typesTableData";

export interface StateData {
	stateName: string;
	stateSlug: Slug;
	borisName: string;
	seo: Seo;
	rating: Rating;
	introText: string;
	summary: BlockContent;
	analysisText: BlockContent;
	analysisSection2: AddSection;
	analysisSection3: AddSection;
	analysisSection4: AddSection;
	analysisSectionLow: AddSection;
	borisSection: AddSection;
	propertyPriceSection: AddSection;
	propertyPriceSection2: AddSection;
	propertyPriceSection3: AddSection;
	gutachterInfoText: BlockContent;
	historicalPriceData: HistoricalPrice[];
	top5: SpecialCity[];
	winner5: SpecialCity[];
	loser5: SpecialCity[];
	faqsList: Faq[];
	sources: BlockContent;
	historicalPriceText: BlockContent;
}

export interface CityData {
	einwohner: number;
	cityName: string;
	citySlug: Slug;
	seo: Seo;
	rating: Rating;
	state: Reference;
	cityType: string;
	stateName: string;
	stateSlug: string;
	summary: BlockContent;
	avgBrw: number;
	avgBrwLastYear: number;
	dateValuesUpdated: Date;
	introText: string;
	historicalPriceText: BlockContent;
	analysisText: BlockContent;
	analysisText2: BlockContent;
	analysisSection2: AddSection;
	analysisSection3: AddSection;
	analysisSection4: AddSection;
	analysisSectionLow: AddSection;
	borisSection: AddSection;
	propertyPriceText: BlockContent;
	propertyPriceText2: BlockContent;
	plzText: BlockContent;
	districtsOfCityText: BlockContent;
	sameBezirkText: BlockContent;
	generalInfoText: BlockContent;
	gutachterInfo: GutachterInfo;
	gutachterInfoContent: ContactDetailType;
	gutachterSlug: string;
	gutachterInfoText: BlockContent;
	gutachterInfoText2: BlockContent;
	historicalPriceData: HistoricalPrice[];
	plzData: PlzInfo[];
	streetsData: StreetsGroupedLetter[];
	sameBezirkData: DistrictsInSameCity[];
	districtsInSameCity: DistrictsInSameCity[];
	districtsOfCity: CitiesWithDistricts[];
	barChartData: BarChartType[];
	analysisComparisonSentence: string;
	addSections: AddSection[];
	faqsList: Faq[];
	sources: BlockContent;
}

export interface DistrictData {
	cityType: string;
	districtName: string;
	districtSlug: Slug;
	seo: Seo;
	rating: Rating;
	summary: BlockContent;
	state: Reference;
	stateName: string;
	stateSlug: string;
	city: CityReference;
	cityName: string;
	citySlug: string;
	avgBrw: number;
	avgBrwLastYear: number;
	introText: string;
	historicalPriceText: BlockContent;
	analysisComparisonSentence: string;
	analysisText: BlockContent;
	plzText: BlockContent;
	sameBezirkText: BlockContent;
	generalInfoText: BlockContent;
	neighboringText: BlockContent;
	propertyPriceText: BlockContent;

	bezirkName: string;
	bezirkBrw: string;
	bezirkRank: number;
	bezirkRankMax: number;
	cityRank: number;
	cityRankMax: number;

	historicalPriceData: HistoricalPrice[];
	plzData: PlzInfo[];
	streetsData: StreetsGroupedLetter[];
	sameBezirkData: DistrictsInSameCity[];
	districtsInSameCity: DistrictsInSameCity[];
	districtsOfCity: CitiesWithDistricts[];
	barChartData: BarChartType[];
	sources: BlockContent;
}

export interface DistrictSlug {
	stateSlug: string;
	citySlug: string;
	districtSlug: Slug;
	_updatedAt: Date;
	seo: SeowithPrio;
}

export interface CitySlug {
	stateSlug: string;
	citySlug: Slug;
	_updatedAt: Date;
	seo: SeowithPrio;
}

export interface StateSlug {
	stateSlug: Slug;
	_updatedAt: Date;
	seo: SeowithPrio;
}

export interface GrundbuchamtData {
	name: string;
	state: Reference;
	stateName: string;
	stateSlug: string;
	slug: Slug;
	contact: ContactDetailType;
	_id: string;
	rating: Rating;
	h1: string;
	seo: Seo;
	cityName: string;
	openingTimes: OpeningTimePerDay[];
	introSection: BlockContent;
	blogContent: BlockContent;
	faqsList: Faq[];
}

export interface DistrictEnum {
	kreis: string;
	districtName?: string;
	districtSlug?: Slug;
	citySlug: Slug;
	cityName: string;
	avgBrw: number;
	_id: string;
	//TODO: add isKreisfrei
}

export interface BlogPost {
	_id: string;
	public: boolean;
	stateName: string;
	stateSlug: string;
	blogContent: BlockContent;
	blockContent: BlockContent;
	publishedAt: Date;
	rating: Rating;
	title: string;
	introText: string;
	summary: BlockContent;
	slug: Slug;
	category: string;
	seo: SeowithPrio;
	mainImage: MainImage;
	readingTime: number;
	sections: AddSection[];
	sources: BlockContent;
	faqTitle: string;
	faqsList: Faq[];
	breadcrumbTitle: string;
}

export interface MainImage {
	_type: string;
	asset: ImageAsset;
}

export interface ImageAsset {
	_ref: string;
	_type: string;
}

export interface GutachterausschussData {
	name: string;
	internalId: number;
	seo: Seo;
	slug: Slug;
	h1: string;
	rating: string;
	contact: ContactDetailType;
	state: Reference;
	stateName: string;
	stateSlug: string;
	cities: RelatedCitiesReference[];
	introSection: BlockContent;
	section1: AddSection;
	section2: AddSection;
	sections: AddSection[];
	faqsList: Faq[];
}

export interface PriceStateData {
	stateName: string;
	stateSlug: Slug;
	seo: Seo;
	rating: Rating;
}

export interface PriceCityData {
	cityName: string;
	citySlug: Slug;
	cityType: "subdistricts" | "districts_onpage" | "districts_newpage" | "none";
	einwohner: number;
	state: Reference;
	stateName: string;
	stateSlug: string;
	kreis: string;
	isKreisfrei: boolean;
	seo: Seo;
	rating: Rating;
	sectionBuyingMarket: AddSection;
	sectionRentingMarket: AddSection;
	sectionHousePrices: AddSection;
	sectionApartmentPrices: AddSection;
	sectionHousePrices2: AddSection;
	sectionApartmentPrices2: AddSection;
	houseRent: RealEstatePrice[];
	houseBuy: RealEstatePrice[];
	apartmentRent: RealEstatePrice[];
	apartmentBuy: RealEstatePrice[];
	faqsList: Faq[];
	sources: BlockContent;
	neighboringCities: NeighboringCityPrices[];
	districts: NeighboringDistrictPrices[];
	sectionNeighboringCityBuyPrices: AddSection;
	sectionNeighboringCityRentPrices: AddSection;
	sectionBuyingMarket2: AddSection;
	sectionRentingMarket2: AddSection;
	sectionBuyingMarket3: AddSection;
	sectionRentingMarket3: AddSection;
	sectionDrivingFactors: AddSection;
	sectionIntro: AddSection;
	sectionPropertyPrices: AddSection;
}

export interface PriceDistrictData {
	cityName: string;
	districtName: string;
	districtSlug: Slug;
	citySlug: string;
	cityType: "subdistricts" | "districts_onpage" | "districts_newpage" | "none";
	einwohner: number;
	state: Reference;
	stateName: string;
	stateSlug: string;
	kreis: string;
	isKreisfrei: boolean;
	seo: Seo;
	rating: Rating;
	sectionBuyingMarket: AddSection;
	sectionRentingMarket: AddSection;
	sectionHousePrices: AddSection;
	sectionApartmentPrices: AddSection;
	sectionHousePrices2: AddSection;
	sectionApartmentPrices2: AddSection;
	houseRent: RealEstatePrice[];
	houseBuy: RealEstatePrice[];
	apartmentRent: RealEstatePrice[];
	apartmentBuy: RealEstatePrice[];
	faqsList: Faq[];
	sources: BlockContent;
	neighboringCities: NeighboringCityPrices[];
	neighboringDistricts: NeighboringDistrictPrices[];
	subdistricts: NeighboringDistrictPrices[];
	sectionNeighboringCityBuyPrices: AddSection;
	sectionNeighboringCityRentPrices: AddSection;
	sectionBuyingMarket2: AddSection;
	sectionRentingMarket2: AddSection;
	sectionBuyingMarket3: AddSection;
	sectionRentingMarket3: AddSection;
	sectionDrivingFactors: AddSection;
	sectionIntro: AddSection;
	sectionPropertyPrices: AddSection;
}
