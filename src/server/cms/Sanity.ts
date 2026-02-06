import {
	createImageUrlBuilder,
	type SanityImageSource,
} from "@sanity/image-url";
import { createClient, type SanityClient } from "next-sanity";
import type {
	BlogPost,
	CityData,
	CitySlug,
	DistrictData,
	DistrictEnum,
	DistrictSlug,
	GrundbuchamtData,
	GutachterausschussData,
	PriceCityData,
	PriceDistrictData,
	PriceStateData,
	StateData,
	StateSlug,
} from "./types";

export class Sanity {
	client: SanityClient;
	builder: ReturnType<typeof createImageUrlBuilder>;

	constructor() {
		this.client = createClient({
			projectId: "ykthmjxc",
			dataset: "production",
			apiVersion: "2023-10-21",
			useCdn: process.env.USE_CDN === "true",
		});

		this.builder = createImageUrlBuilder(this.client);
	}

	// https://github.com/sanity-io/image-url
	imageFor(source: SanityImageSource) {
		return this.builder.image(source);
	}

	getStateData = async (stateSlug: string): Promise<StateData> => {
		const data: StateData = await this.client.fetch(
			`*[_type == 'state' && stateSlug.current == $slug][0] {
        stateName,
        stateSlug,
        borisName,
        seo,
        rating,
        summary,
        introText,
        historicalPriceText,
        analysisText,
        analysisSection2,
        analysisSection3,
        analysisSection4,
        analysisSectionLow,
        top5,
        winner5, 
        loser5,
        borisSection,
        propertyPriceSection,
        propertyPriceSection2,
        propertyPriceSection3,
        gutachterInfoText,
        historicalPriceData,
        stateToCities,
        faqsList,
        sources,
      }`,
			{ slug: stateSlug },
		);
		return data;
	};

	getCityData = async (
		citySlug: string,
		stateSlug: string | null = null,
	): Promise<CityData> => {
		const data: CityData = await this.client.fetch(
			`*[_type == 'city' && stateSlug == $stateSlug && citySlug.current == $citySlug] | order(_updatedAt desc) [0] {
        cityName,
        citySlug,
        einwohner,
        seo,
        summary,
        rating,
        cityType,
        state,
        stateName,
        stateSlug,
        avgBrw,
        avgBrwLastYear,
        introText,
        historicalPriceText,
        analysisText,
        analysisText2,
        analysisSection2,
        analysisSection3,
        analysisSection4,
        analysisSectionLow,
        borisSection,
        propertyPriceText,
        propertyPriceText2,
        plzText,
        sameBezirkText,
        generalInfoText,
        districtsOfCityText,
        districtsInSameCity,
        historicalPriceData,
        plzData,
        streetsData,
        sameBezirkData,
        districtsOfCity,
        barChartData,
        analysisComparisonSentence,
        addSections,
        gutachterInfo,
        gutachterInfoContent,
        gutachterSlug,
        gutachterInfoText,
        gutachterInfoText2,
        faqsList,
        sources,

      }`,
			{ stateSlug: stateSlug, citySlug: citySlug },
		);
		return data;
	};

	getDistrictData = async (
		districtSlug: string,
		citySlug: string,
		stateSlug: string | null = null,
	): Promise<DistrictData> => {
		const data: DistrictData = await this.client.fetch(
			`*[_type == 'district' && stateSlug == $stateSlug && citySlug == $citySlug && districtSlug.current == $districtSlug] | order(_updatedAt desc) [0] {
        cityType,
        districtName,
        districtSlug,
        seo,
        summary,
        rating,
        state,
        stateName,
        stateSlug,
        propertyPriceText,
        city -> {
          gutachterInfo,
          gutachterInfoContent,
          gutachterSlug,
          gutachterInfoText,
          gutachterInfoText2,
          districtsOfCityText,
          districtsInSameCity,
          faqsList,
          _id,
          einwohner,
        },
        cityName,
        citySlug,
        avgBrw,
        avgBrwLastYear,
        introText,
        historicalPriceText,
        analysisComparisonSentence,
        analysisText,
        plzText,
        sameBezirkText,
        generalInfoText,
        bezirkName,
        bezirkBrw,
        bezirkRank,
        bezirkRankMax,
        cityRank,
        cityRankMax,
        neighboringText,
        historicalPriceData,
        plzData,
        streetsData,
        sameBezirkData,
        districtsOfCity,
        districtsInSameCity,
        barChartData,
        sources,
      }`,
			// addSections,
			// faqsList,
			{ stateSlug: stateSlug, citySlug: citySlug, districtSlug: districtSlug },
		);
		return data;
	};

	getAllDistricts = async (): Promise<DistrictSlug[]> => {
		const data: DistrictSlug[] = await this.client.fetch(
			`*[_type == 'district'] {
        stateSlug,
        citySlug,
        districtSlug,
        _updatedAt,
        seo
      }`,
		);
		return data;
	};

	getAllCities = async (): Promise<CitySlug[]> => {
		const data: CitySlug[] = await this.client.fetch(
			`*[_type == 'city'] {
        stateSlug,
        citySlug,
        _updatedAt,
        seo
      }`,
		);
		return data;
	};

	getAllStates = async (): Promise<StateSlug[]> => {
		const data: StateSlug[] = await this.client.fetch(
			`*[_type == 'state' && stateSlug != null] {
        stateSlug,
        _updatedAt,
        seo
      }`,
		);
		return data;
	};

	getAllCitiesInState = async (
		state: string,
		withDistricts: boolean = false,
	): Promise<DistrictEnum[]> => {
		let combinedData;

		if (withDistricts) {
			const data: DistrictEnum[] = await this.client.fetch(
				`*[_type == 'city' && stateSlug == $state && cityType in ['none', 'subdistricts_only'] ]{
          kreis,
          citySlug,
          cityName, 
          avgBrw,
          _id,
        }`,
				{ state: state },
			);

			const data2: DistrictEnum[] = await this.client.fetch(
				`*[_type == 'district' && stateSlug == $state]{
          kreis,
          districtName,
          districtSlug,
          citySlug,
          cityName, 
          avgBrw,
          _id,
        }`,
				{ state: state },
			);

			combinedData = [...data, ...data2];
		} else {
			const data: DistrictEnum[] = await this.client.fetch(
				`*[_type == 'city' && stateSlug == $state]{
          kreis,
          citySlug,
          cityName, 
          avgBrw,
          _id,
        }`,
				{ state: state },
			);
			combinedData = [...data];
		}

		return combinedData;
	};

	getBlogPost = async (slug: string): Promise<BlogPost> => {
		const data: BlogPost = await this.client.fetch(
			`*[_type == 'blog' && slug.current == $slug][0] {
        public,
        publishedAt,
        rating,
        title,
        introText,
        blogContent,
        summary,
        slug,
        category,
        breadcrumbTitle,
        seo,
        mainImage,
        readingTime,
        
        sources,
        faqTitle,
        faqsList,
      }`,
			// sections,
			{ slug: slug },
		);
		return data;
	};

	getAllPublicBlogPosts = async (): Promise<BlogPost[]> => {
		const data: BlogPost[] = await this.client.fetch(
			`*[_type == 'blog' && public==true && category != null]{
        _id,
        publishedAt,
        slug,
        rating,
        category,
        mainImage,
        readingTime,
        title
      }`,
		);
		return data;
	};

	getAllPublicBlogPostsSeo = async (): Promise<BlogPost[]> => {
		const data: BlogPost[] = await this.client.fetch(
			`*[_type == 'blog' && slug.current != 'home' && slug.current != 'datenschutz' && public==true]{
        publishedAt,
        slug,
        seo,
      }`,
		);
		return data;
	};

	getAllGrundbuchamtSeo = async (): Promise<GrundbuchamtData[]> => {
		const data: GrundbuchamtData[] = await this.client.fetch(
			`*[_type == 'authorities' && authorityType == 'grundbuchamt']{
        stateSlug,
        slug,
        seo,
      }`,
		);
		return data;
	};

	getAllGrundbuchamtByState = async (
		stateSlug: string,
	): Promise<GrundbuchamtData[]> => {
		const data: GrundbuchamtData[] = await this.client.fetch(
			`*[_type == 'authorities' && stateSlug == $stateSlug && authorityType == 'grundbuchamt']{
       name,
        seo,
        rating,
        h1,
        contact,
        cityName,
        stateName,
        stateSlug,
        state,
        stateName,
        slug,
        contact,
        _id,
        // name,
        // state,
        // stateName,
        // slug,
        // contact,
        // _id,
      }`,
			{ stateSlug: stateSlug },
		);
		return data;
	};

	getGrundbuchamt = async (
		stateSlug: string,
		citySlug: string,
	): Promise<GrundbuchamtData> => {
		const data: GrundbuchamtData = await this.client.fetch(
			`*[_type == 'authorities' && stateSlug == $stateSlug && slug.current == $citySlug && authorityType == 'grundbuchamt'][0] {
        name,
        seo,
        rating,
        h1,
        contact,
        cityName,
        stateName,
        stateSlug,
        state,
        stateName,
        slug,
        contact,
        openingTimes,
        _id,
        blogContent,
        introSection,
      }`,
			{ stateSlug: stateSlug, citySlug: citySlug },
		);
		return data;
	};

	getGutachterausschuss = async (
		stateSlug: string,
		citySlug: string,
	): Promise<GutachterausschussData> => {
		const data: GutachterausschussData = await this.client.fetch(
			`*[_type == 'gutachterausschuss' && stateSlug == $stateSlug && slug.current == $citySlug][0] {
      name,
      rating,
      h1,
      seo,
      contact,
      stateName,
      stateSlug,
      cities,
      introSection,
      section1,
      section2,
      sections,
      faqsList,
      }`,
			{ stateSlug: stateSlug, citySlug: citySlug },
		);
		return data;
	};

	getAllGutachterausschussByState = async (
		stateSlug: string,
	): Promise<GutachterausschussData[]> => {
		const data: GutachterausschussData[] = await this.client.fetch(
			`*[_type == 'gutachterausschuss' && stateSlug == $stateSlug]{
        name,
        h1,
        contact,
        stateName,
        stateSlug,
        slug,
      }`,
			{ stateSlug: stateSlug },
		);
		return data;
	};

	getAllGutachterausschussSeo = async (): Promise<GrundbuchamtData[]> => {
		const data: GrundbuchamtData[] = await this.client.fetch(
			`*[_type == 'gutachterausschuss']{
        stateSlug,
        slug,
        seo,
      }`,
		);
		return data;
	};

	getCategoryBlog = async (slug: string): Promise<BlogPost> => {
		const data: BlogPost = await this.client.fetch(
			`*[_type == 'vertical_entries' && slug.current == $slug][0] {
        public,
        publishedAt,
        rating,
        title,
        introText,
        summary,
        slug,
        category,
        breadcrumbTitle,
        seo,
        mainImage,
        readingTime,
        sections,
        sources,
        faqTitle,
        faqsList,
      }`,
			{ slug: slug },
		);
		return data;
	};

	getGrundsteuerState = async (slug: string): Promise<BlogPost> => {
		const data: BlogPost = await this.client.fetch(
			`*[_type == 'grundsteuer_state' && slug.current == $slug][0] {
        public,
        publishedAt,
        rating,
        title,
        stateName,
        stateSlug,
        introText,
        summary,
        slug,
        category,
        breadcrumbTitle,
        seo,
        mainImage,
        readingTime,
        sections,
        blogContent,
        sources,
        faqTitle,
        faqsList,
      }`,
			{ slug: slug },
		);
		return data;
	};

	getAllGrundsteuerSeo = async (): Promise<BlogPost[]> => {
		const data: BlogPost[] = await this.client.fetch(
			`*[_type == 'grundsteuer_state']{
        slug,
        seo,
      }`,
		);
		return data;
	};

	getBorisState = async (slug: string): Promise<BlogPost> => {
		const data: BlogPost = await this.client.fetch(
			`*[_type == 'boris_state' && slug.current == $slug][0] {
        public,
        publishedAt,
        rating,
        title,
        stateName,
        stateSlug,
        introText,
        summary,
        slug,
        category,
        breadcrumbTitle,
        seo,
        mainImage,
        readingTime,
        sections,
        blogContent,
        sources,
        faqTitle,
        faqsList,
      }`,
			{ slug: slug },
		);
		return data;
	};

	getAllBorisStates = async (): Promise<GrundbuchamtData[]> => {
		const data: GrundbuchamtData[] = await this.client.fetch(
			`*[_type == 'boris_state']{
        stateSlug,
        slug,
        seo,
      }`,
		);
		return data;
	};

	getPriceStateData = async (stateSlug: string): Promise<PriceStateData> => {
		const data: PriceStateData = await this.client.fetch(
			`*[_type == 'statePrice' && stateSlug.current == $stateSlug] | order(_updatedAt desc) [0] {
        stateName,
        stateSlug,
        seo,
        rating,
      }`,
			{ stateSlug: stateSlug },
		);
		return data;
	};

	getAllPriceStateData = async (): Promise<PriceStateData[]> => {
		const data: PriceStateData[] = await this.client.fetch(
			`*[_type == 'statePrice'] {
        stateName,
        stateSlug,
        seo,
      }`,
		);
		return data;
	};

	getAllPriceCitiesInState = async (
		stateSlug: string,
	): Promise<PriceCityData[]> => {
		const data: PriceCityData[] = await this.client.fetch(
			`*[_type == 'cityPrice' && stateSlug == $stateSlug]{
          cityName,
          citySlug,
          stateSlug,
          stateName,
          kreis,
          isKreisfrei,
          "houseBuy": [houseBuy[19]],
          "apartmentBuy": [apartmentBuy[19]]
        }`,
			{ stateSlug: stateSlug },
		);
		return data;
	};

	getPriceCityData = async (
		stateSlug: string | null,
		citySlug: string,
	): Promise<PriceCityData> => {
		const data: PriceCityData = await this.client.fetch(
			`*[_type == 'cityPrice' && stateSlug == $stateSlug && citySlug.current == $citySlug] | order(_updatedAt desc) [0] {
        cityName,
        citySlug,
        cityType,
        einwohner,
        state,
        stateName,
        stateSlug,
        kreis,
        isKreisfrei,
        seo,
        rating,
        houseRent,
        houseBuy,
        apartmentRent,
        apartmentBuy,
        faqsList,
        sources,
        neighboringCities,
        districts,
        sectionNeighboringCityBuyPrices,
        sectionNeighboringCityRentPrices,
        sectionBuyingMarket,
        sectionRentingMarket,
        sectionHousePrices,
        sectionApartmentPrices,
        sectionHousePrices2,
        sectionApartmentPrices2,
        sectionRentingMarket2,
        sectionBuyingMarket2,
        sectionBuyingMarket3,
        sectionRentingMarket3,
        sectionDrivingFactors,
        sectionIntro,
        sectionPropertyPrices,
      }`,
			{ stateSlug, citySlug },
		);
		return data;
	};

	getPriceDistrictData = async (
		stateSlug: string | null,
		citySlug: string,
		districtSlug: string,
	): Promise<PriceDistrictData> => {
		const data: PriceDistrictData = await this.client.fetch(
			`*[_type == 'districtPrice' && stateSlug == $stateSlug && citySlug == $citySlug && districtSlug.current == $districtSlug] | order(_updatedAt desc) [0] {
        cityName,
        districtName,
        districtSlug,
        citySlug,
        cityType,
        einwohner,
        state,
        stateName,
        stateSlug,
        kreis,
        isKreisfrei,
        seo,
        rating,
        houseRent,
        houseBuy,
        apartmentRent,
        apartmentBuy,
        faqsList,
        sources,
        neighboringCities,
        neighboringDistricts,
        subdistricts,
        sectionNeighboringCityBuyPrices,
        sectionNeighboringCityRentPrices,
        sectionBuyingMarket,
        sectionRentingMarket,
        sectionHousePrices,
        sectionApartmentPrices,
        sectionHousePrices2,
        sectionApartmentPrices2,
        sectionRentingMarket2,
        sectionBuyingMarket2,
        sectionBuyingMarket3,
        sectionRentingMarket3,
        sectionDrivingFactors,
        sectionIntro,
        sectionPropertyPrices,
      }`,
			{ stateSlug, citySlug, districtSlug },
		);
		return data;
	};

	getAllStatePriceData = async (): Promise<PriceStateData[]> => {
		const data: PriceStateData[] = await this.client.fetch(
			`*[_type == 'statePrice'] {
        stateName,
        stateSlug,
        seo,
      }`,
		);
		return data;
	};

	getAllCityPriceData = async (): Promise<PriceCityData[]> => {
		const data: PriceCityData[] = await this.client.fetch(
			`*[_type == 'cityPrice'] {
        cityName,
        citySlug,
        stateSlug,
        stateName,
        
      }`,
		);
		return data;
	};

	getAllDistrictPriceData = async (): Promise<PriceDistrictData[]> => {
		const data: PriceDistrictData[] = await this.client.fetch(
			`*[_type == 'districtPrice'] {
        districtName,
        districtSlug,
        cityName,
        citySlug,
        stateSlug,
        stateName,
        
      }`,
		);
		return data;
	};

	getAllCategoryBlogData = async (): Promise<BlogPost[]> => {
		const data: BlogPost[] = await this.client.fetch(
			`*[_type == 'vertical_entries'] {
        slug,
        seo,
      }`,
		);
		return data;
	};
}
