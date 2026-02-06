import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import CityPagePrice from "@/components/content/12-city-price/city-page";
import StatePricePage from "@/components/content/11-state-price/state-page";
import { Sanity } from "@/server/cms/Sanity";
import type { PriceCityData, PriceStateData } from "@/server/cms/types";

type PageProps = {
	params: Promise<{ stateSlug: string }>;
};

const CITY_STATES = ["berlin", "hamburg"];

const fetchData = cache(async (stateSlug: string) => {
	const sanity = new Sanity();
	const isCityState = CITY_STATES.includes(stateSlug);

	if (isCityState) {
		return sanity.getPriceCityData(null, stateSlug);
	}

	return sanity.getPriceStateData(stateSlug);
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);

	if (!data) {
		return { title: "Immobilienpreise" };
	}

	const isCityState = CITY_STATES.includes(stateSlug);
	const title = isCityState
		? `Immobilienpreise und Quadratmeterpreise ${(data as PriceCityData).cityName} 2026`
		: data.seo.title;

	return {
		title,
		description: data.seo.metaDescription ?? "Immobilienpreise",
		alternates: {
			canonical: `https://www.immobilienpreise-2026.de/${stateSlug}`,
		},
	};
}

export default async function StatePage({ params }: PageProps) {
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);

	if (!data) {
		return <h2>Immobilienpreise</h2>;
	}

	const isCityState = CITY_STATES.includes(stateSlug);

	if (isCityState) {
		return <CityPagePrice data={data as PriceCityData} />;
	}

	const sanity = new Sanity();
	const cities = await sanity.getAllPriceCitiesInState(stateSlug);

	return <StatePricePage cities={cities} data={data as PriceStateData} />;
}
