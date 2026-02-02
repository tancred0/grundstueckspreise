import type { Metadata, ResolvingMetadata } from "next";
import StatePricePage from "@/components/content/11-state-price/state-page";
import { Sanity } from "@/server/cms/Sanity";

type PageProps = {
	params: Promise<{ stateSlug: string }>;
};

const fetchData = async (stateSlug: string) => {
	const sanity = new Sanity();
	const data = await sanity.getPriceStateData(stateSlug);
	return data;
};

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);

	return {
		title: data.seo.title,
		description: data.seo.metaDescription,
		alternates: {
			canonical: `https://www.immobilienpreise-deutschland.com/immobilienpreise/${stateSlug}`,
		},
	};
}

export default async function StatePage({ params }: PageProps) {
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);
	const sanity = new Sanity();
	const cities = await sanity.getAllPriceCitiesInState(stateSlug);

	return <StatePricePage cities={cities} data={data} />;
}
