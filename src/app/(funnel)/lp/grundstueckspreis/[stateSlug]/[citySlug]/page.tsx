import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CityLandingPage from "@/components/content/10_Landing/city-landing-page";
import DistrictLandingPage from "@/components/content/10_Landing/district-landing-page";
import { Sanity } from "@/server/cms/Sanity";
import { isCityData, isDistrictData } from "@/server/cms/typeGuards";

type PageProps = {
	params: Promise<{ stateSlug: string; citySlug: string }>;
};

const fetchData = cache((stateSlug: string, citySlug: string) => {
	const isCity = stateSlug === "berlin" || stateSlug === "hamburg";
	if (!isCity) {
		const sanity = new Sanity();
		return sanity.getCityData(citySlug, stateSlug);
	} else {
		const sanity = new Sanity();
		return sanity.getDistrictData(citySlug, stateSlug);
	}
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);

	const title = `Grundstückspreise ${data.cityName} 2026 | Jetzt kostenlos abfragen`;
	const description = `Aktuelle Grundstückspreise 2026 für ${data.cityName}. Jetzt kostenlos Grundstückswert für Ihre Adresse abfragen.`;

	return {
		title: title,
		description: description,
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default async function Page({ params }: PageProps) {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);
	const isCity = stateSlug === "berlin" || stateSlug === "hamburg";

	if (stateSlug === "bremen" && isCityData(data)) {
		const districts = data.districtsOfCity.flatMap(
			(district) => district.subdistrict,
		);
		const enhancedDistricts = districts.map((district) => ({
			...district,
			avg: district.avg,
			min: Math.round(district.avg / 5 / 10) * 10,
			max: Math.round((district.avg * 5) / 10) * 10,
		}));
		return <CityLandingPage data={data} districts={enhancedDistricts} />;
	} else if (!isCity && isCityData(data)) {
		return <CityLandingPage data={data} districts={data.districtsInSameCity} />;
	} else if (isCity) {
		return (
			<DistrictLandingPage
				data={data}
				districts={data.sameBezirkData}
				isCity={true}
			/>
		);
	} else {
		notFound();
	}
}
