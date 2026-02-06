import Link from "next/link";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";
import { Section, Typography } from "@/components/ui/typography";
import { PortableTextRenderer } from "@/server/cms/components";
import type { DistrictEnum, PriceCityData } from "@/server/cms/types";
import type { AddSection, BlockContent } from "@/server/cms/typesLowLevel";
import type { RealEstatePrice } from "@/server/cms/typesTableData";

export interface CityDetail {
	houseBuyPrice: RealEstatePrice;
	apartmentBuyPrice: RealEstatePrice;
	citySlug: string;
	cityName: string;
}

interface CityGroup {
	[kreis: string]: CityDetail[];
}

export default function CityPriceEnum({
	heading,
	currentSlug,
	cities,
	sectionNumber,
	section,
}: {
	heading: string;
	cities: PriceCityData[];
	currentSlug: string;
	sectionNumber: number;
	section?: AddSection;
}) {
	const groupByKreis = (cities: PriceCityData[]): CityGroup => {
		return cities.reduce<CityGroup>((acc, city) => {
			const { kreis, isKreisfrei, houseBuy, apartmentBuy, citySlug, cityName } =
				city;

			// Create a group key that combines kreis and kreisfrei status
			const groupKey = isKreisfrei ? `Kreisfreie Städte` : kreis;

			if (!acc[groupKey]) {
				acc[groupKey] = [];
			}
			acc[groupKey].push({
				houseBuyPrice: houseBuy[0]!,
				apartmentBuyPrice: apartmentBuy[0]!,
				citySlug: citySlug.current,
				cityName,
			});
			return acc;
		}, {});
	};

	// Example usage
	const groupedCities = groupByKreis(cities);

	const kreisfreieStädte = groupedCities["Kreisfreie Städte"];
	const kreisCities = Object.fromEntries(
		Object.entries(groupedCities).filter(
			([kreis]) => kreis !== "Kreisfreie Städte",
		),
	);

	return (
		<Section id={`sec${sectionNumber}`}>
			<Typography variant="h2">{heading}</Typography>
			{section && <PortableTextRenderer input={section.text} />}
			<Typography variant="h3">Kreisfreie Städte</Typography>
			<CityKreistable cities={kreisfreieStädte!} currentSlug={currentSlug} />
			{Object.entries(kreisCities)
				.sort(([kreisA], [kreisB]) => kreisA.localeCompare(kreisB))
				.map(([kreis, cities], index) => (
					<div key={index}>
						<Typography variant="h3">{kreis}</Typography>
						<CityKreistable cities={cities} currentSlug={currentSlug} />
					</div>
				))}
		</Section>
	);
}

function CityKreistable({
	cities,
	currentSlug,
}: {
	cities: CityDetail[];
	currentSlug: string;
}) {
	const citiesSorted = cities.sort((a, b) =>
		a.cityName.localeCompare(b.cityName),
	);
	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Stadt</th>
						<th className="th">Hauspreis 2026</th>
						<th className="th">△ Vorjahr</th>
						<th className="th">Wohnungspreis 2026</th>
						<th className="th">△ Vorjahr</th>
					</tr>
				</thead>
				<tbody>
					{citiesSorted.map((city) => (
						<tr className="tr" key={city.citySlug}>
							<td className="td">
								<Link
									className="table-link"
									href={`${currentSlug}/${city.citySlug}`}
								>
									{city.cityName}
								</Link>
							</td>
							<td className="td whitespace-nowrap">
								{Math.round(city.houseBuyPrice.avg).toLocaleString("de-DE")}{" "}
								€/m²
							</td>
							<td className="td whitespace-nowrap">
								{city.houseBuyPrice.changeYear > 0 ? (
									<span className="flex items-center gap-1 text-green-500">
										<LuArrowUpRight className="h-4 w-4" />
										{city.houseBuyPrice.changeYear.toFixed(1)} %
									</span>
								) : (
									<span className="flex items-center gap-1 text-red-500">
										<LuArrowDownRight className="h-4 w-4" />
										{city.houseBuyPrice.changeYear.toFixed(1)} %
									</span>
								)}
							</td>
							<td className="td whitespace-nowrap">
								{Math.round(city.apartmentBuyPrice.avg).toLocaleString("de-DE")}{" "}
								€/m²
							</td>
							<td className="td whitespace-nowrap">
								{city.apartmentBuyPrice.changeYear > 0 ? (
									<span className="flex items-center gap-1 text-green-500">
										<LuArrowUpRight className="h-4 w-4" />
										{city.apartmentBuyPrice.changeYear.toFixed(1)} %
									</span>
								) : (
									<span className="flex items-center gap-1 text-red-500">
										<LuArrowDownRight className="h-4 w-4" />
										{city.apartmentBuyPrice.changeYear.toFixed(1)} %
									</span>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
