import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import DistrictLandingPage from "@/components/content/10_Landing/district-landing-page";
import { Sanity } from "@/server/cms/Sanity";

type PageProps = {
	params: Promise<{
		stateSlug: string;
		citySlug: string;
		districtSlug: string;
	}>;
};

const fetchData = cache((state: string, city: string, district: string) => {
	const sanity = new Sanity();
	return sanity.getDistrictData(district, city, state);
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug, districtSlug } = await params;
	const data = await fetchData(stateSlug, citySlug, districtSlug);

	const title = `Bodenrichtwert ${data.cityName} ${data.districtName} 2026 | Jetzt kostenlos abfragen`;
	const description = `Aktuelle Bodenrichtwerte 2026 für ${data.cityName} ${data.districtName}. Jetzt kostenlos Grundstückswert für Ihre Adresse abfragen.`;
	const canonicalUrl = `https://www.immobilienpreise-deutschland.com/bodenrichtwert/${stateSlug}/${citySlug}`;

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
	const { stateSlug, citySlug, districtSlug } = await params;
	const data = await fetchData(stateSlug, citySlug, districtSlug);
	if (stateSlug === "bremen") {
		return (
			<DistrictLandingPage
				data={data}
				districts={data.sameBezirkData}
				isCity={true}
			/>
		);
	}
	return (
		<DistrictLandingPage data={data} districts={data.districtsInSameCity} />
	);
}
