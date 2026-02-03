import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import CityPagePrice from "@/components/content/12-city-price/city-page";
import { Sanity } from "@/server/cms/Sanity";
import { isCityData } from "@/server/cms/typeGuards";

type PageProps = {
	params: Promise<{ stateSlug: string; citySlug: string }>;
};

const fetchData = cache((stateSlug: string, citySlug: string) => {
	const sanity = new Sanity();
	return sanity.getPriceCityData(stateSlug, citySlug);
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);

	return {
		title: `Immobilienpreise und Quadratmeterpreise ${data.cityName} 2026`,
		description: data.seo.metaDescription ?? "Immobilienpreise",
		alternates: {
			canonical: `https://www.immobilienpreise-deutschland.com/${stateSlug}/${citySlug}`,
		},
	};
}

export default async function Page({ params }: PageProps) {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);

	// save data to a file

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

	if (isCityData(data)) {
		return <CityPagePrice data={data} />;
	}

	return <h2>Immobilienpreise</h2>;
}
