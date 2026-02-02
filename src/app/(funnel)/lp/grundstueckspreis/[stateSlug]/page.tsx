import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import CityLandingPage from "@/components/content/10_Landing/city-landing-page";
import { Sanity } from "@/server/cms/Sanity";

type PageProps = {
	params: Promise<{ stateSlug: string }>;
};

const fetchData = cache((stateSlug: string) => {
	// only for berlin and hamburg
	const sanity = new Sanity();
	return sanity.getCityData(stateSlug);
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);

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
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);
	// Flatten the array of subdistricts
	const districts = data.districtsOfCity.flatMap(
		(district) => district.subdistrict,
	);
	if (stateSlug === "hamburg") {
		const enhancedDistricts = districts.map((district) => ({
			...district,
			avg: district.avg,
			min: Math.round(district.avg / 5 / 10) * 10,
			max: Math.round((district.avg * 5) / 10) * 10,
		}));
		// console.log(enhancedDistricts);
		return <CityLandingPage data={data} districts={enhancedDistricts} />;
	} else if (stateSlug === "berlin") {
		return <CityLandingPage data={data} districts={data.districtsInSameCity} />;
	}
}
