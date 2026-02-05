import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import DistrictPagePrice from "@/components/content/13-district-price/district-page";
import { Sanity } from "@/server/cms/Sanity";
import { isDistrictData } from "@/server/cms/typeGuards";

type PageProps = {
	params: Promise<{
		stateSlug: string;
		citySlug: string;
		districtSlug: string;
	}>;
};

const fetchData = cache(
	(stateSlug: string, citySlug: string, districtSlug: string) => {
		const sanity = new Sanity();
		return sanity.getPriceDistrictData(stateSlug, citySlug, districtSlug);
	},
);

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug, districtSlug } = await params;
	const data = await fetchData(stateSlug, citySlug, districtSlug);

	return {
		title: `Immobilienpreise und Quadratmeterpreise ${data.cityName}-${data.districtName} 2026`,
		description: data.seo.metaDescription ?? "Immobilienpreise",
		alternates: {
			canonical: `https://www.immobilienpreise-2026.de/${stateSlug}/${citySlug}/${districtSlug}`,
		},
	};
}

export default async function Page({ params }: PageProps) {
	const { stateSlug, citySlug, districtSlug } = await params;
	const data = await fetchData(stateSlug, citySlug, districtSlug);

	if (data === null) {
		const city_decoded = decodeURIComponent(citySlug);
		const district_decoded = decodeURIComponent(districtSlug);

		// Replace umlauts in both city and district if present
		const fixUmlauts = (str: string) =>
			str.replace(/ä|ö|ü/gi, (match) => {
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

		const city_fixed = /[ÄÖÜäöü]/i.test(city_decoded)
			? fixUmlauts(city_decoded)
			: city_decoded;
		const district_fixed = /[ÄÖÜäöü]/i.test(district_decoded)
			? fixUmlauts(district_decoded)
			: district_decoded;

		// If any fixes occurred, redirect using the fixed slugs
		if (city_fixed !== citySlug || district_fixed !== districtSlug) {
			redirect(
				`/${stateSlug}/${city_fixed}/${district_fixed}`,
			);
		}

		// Fallback: redirect up one level
		// redirect(`/${stateSlug}/${city_fixed}`);
	}

  
	if (isDistrictData(data)) {
		return <DistrictPagePrice data={data} />;
	}

	return <h2>Immobilienpreise</h2>;
}
