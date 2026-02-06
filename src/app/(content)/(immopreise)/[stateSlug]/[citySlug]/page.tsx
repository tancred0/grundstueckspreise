import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import CityPagePrice from "@/components/content/12-city-price/city-page";
import DistrictPagePrice from "@/components/content/13-district-price/district-page";
import { Sanity } from "@/server/cms/Sanity";
import type { PriceCityData, PriceDistrictData } from "@/server/cms/types";
import { isCityData, isDistrictData } from "@/server/cms/typeGuards";

type PageProps = {
	params: Promise<{ stateSlug: string; citySlug: string }>;
};

const CITY_STATES = ["berlin", "hamburg"];

const fetchData = cache(async (stateSlug: string, citySlug: string) => {
	const sanity = new Sanity();
	const isCityState = CITY_STATES.includes(stateSlug);

	if (isCityState) {
		return sanity.getPriceDistrictData(null, stateSlug, citySlug);
	}

	return sanity.getPriceCityData(stateSlug, citySlug);
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);

	if (!data) {
		return { title: "Immobilienpreise" };
	}

	const isCityState = CITY_STATES.includes(stateSlug);
	const title = isCityState
		? `Immobilienpreise und Quadratmeterpreise ${data.cityName}-${(data as PriceDistrictData).districtName} 2026`
		: `Immobilienpreise und Quadratmeterpreise ${data.cityName} 2026`;

	return {
		title,
		description: data.seo.metaDescription ?? "Immobilienpreise",
		alternates: {
			canonical: `https://www.immobilienpreise-2026.de/${stateSlug}/${citySlug}`,
		},
	};
}

export default async function Page({ params }: PageProps) {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);

	if (data === null) {
		const city_decoded = decodeURIComponent(citySlug);
		if (/[ÄÖÜäöü]/i.test(city_decoded)) {
			const city = city_decoded.replace(/ä|ö|ü/gi, (match) => {
				switch (match.toLowerCase()) {
					case "ä":
						return "ae";
					case "ö":
						return "oe";
					case "ü":
						return "ue";
					default:
						return match;
				}
			});
			redirect(`/${stateSlug}/${city}`);
		}
		redirect(`/${stateSlug}`);
	}

	const isCityState = CITY_STATES.includes(stateSlug);

	if (isCityState && isDistrictData(data)) {
		return <DistrictPagePrice data={data as PriceDistrictData} />;
	}

	if (!isCityState && isCityData(data)) {
		return <CityPagePrice data={data as PriceCityData} />;
	}

	redirect(`/${stateSlug}`);
}
