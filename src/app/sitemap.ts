import type { MetadataRoute } from "next";
import { Sanity } from "@/server/cms/Sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const URL = "https://www.grundstueckspreise-deutschland.de";
	const sanity = new Sanity();
	const statePriceData = await sanity.getAllStatePriceData();
	const cityPriceData = await sanity.getAllCityPriceData();
	const districtPriceData = await sanity.getAllDistrictPriceData();

	const date = new Date();
	// const statePriceEnum: MetadataRoute.Sitemap = statePriceData
	// 	.filter((state) => state.stateSlug.current !== "nrw")
	// 	.map((state) => ({
	// 		url: `${URL}/${state.stateSlug.current}`,
	// 		lastModified: date,
	// 	}));

	const cityPriceEnum: MetadataRoute.Sitemap = cityPriceData
		.filter((city) => city.citySlug.current === "berlin")
		.map((city) => ({
			url:
				city.stateSlug === null
					? `${URL}/${city.citySlug.current}`
					: `${URL}/${city.stateSlug}/${city.citySlug.current}`,
			lastModified: date,
		}));

	const districtPriceEnum: MetadataRoute.Sitemap = districtPriceData
		.filter((district) => district.citySlug === "berlin")
		.map((district) => ({
			url:
				district.stateSlug === null
					? `${URL}/${district.citySlug}/${district.districtSlug.current}`
					: `${URL}/${district.stateSlug}/${district.citySlug}/${district.districtSlug.current}`,
			lastModified: date,
		}));

	const mainPages: MetadataRoute.Sitemap = [
		{
			url: `${URL}`,
			lastModified: date,
			// priority: 1,
		},
	];

	return [
		...mainPages,
		// ...statePriceEnum,
		...cityPriceEnum,
		...districtPriceEnum,
	];
}
