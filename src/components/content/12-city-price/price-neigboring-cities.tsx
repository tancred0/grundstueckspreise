import { PortableTextRenderer } from "@/server/cms/components";
import { Typography } from "@/components/ui/typography";
import type { PriceCityData } from "@/server/cms/types";
import type { AddSection } from "@/server/cms/typesLowLevel";
import type {
	NeighboringCityPrices,
	RealEstatePrice,
} from "@/server/cms/typesTableData";
import { PriceChart } from "./price-chart";
import { type CombinedPriceData, PriceChartDouble } from "./price-chart-double";
import {
	TableNeighboringCitiesBuyPrices,
	TableNeighboringCitiesRentPrices,
} from "./table-neighboring-cities";

export default function PriceNeighboringCities({
	sectionNumber,
	sectionNeighboringCityBuyPrices,
	sectionNeighboringCityRentPrices,
	heading,
	neighboringCitiesData,
}: {
	sectionNumber: number;
	sectionNeighboringCityBuyPrices: AddSection;
	sectionNeighboringCityRentPrices: AddSection;
	heading: string;
	neighboringCitiesData: NeighboringCityPrices[];
}) {
	const tenClosestCities = neighboringCitiesData.sort(
		(a, b) => a.distance - b.distance,
	);

	return (
		<section id={`sec${sectionNumber}`}>
			<Typography variant="h2">{heading}</Typography>
			{sectionNeighboringCityBuyPrices.text && (
				<PortableTextRenderer input={sectionNeighboringCityBuyPrices.text} />
			)}
			<TableNeighboringCitiesBuyPrices
				neighboringCitiesData={tenClosestCities}
			/>
			{sectionNeighboringCityRentPrices.text && (
				<PortableTextRenderer input={sectionNeighboringCityRentPrices.text} />
			)}
			<TableNeighboringCitiesRentPrices
				neighboringCitiesData={tenClosestCities}
			/>
		</section>
	);
}
