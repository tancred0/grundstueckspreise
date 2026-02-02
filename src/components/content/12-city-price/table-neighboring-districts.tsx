import Link from "next/link";
import { PercentageChange } from "@/components/ui/percentage-change";
import type { NeighboringDistrictPrices } from "@/server/cms/typesTableData";

export function TableNeighboringDistrictsHouses({
	neighboringCitiesData,
	withLink,
	sortByDistance = true,
	colType = "buyrent",
}: {
	neighboringCitiesData: NeighboringDistrictPrices[];
	withLink: boolean;
	sortByDistance?: boolean;
	colType?: "minmax" | "buyrent";
}) {
	if (neighboringCitiesData.length === 0) {
		return null;
	}

	const sortedData = neighboringCitiesData.sort((a, b) =>
		sortByDistance ? a.distance - b.distance : 0,
	);

	const rows = sortedData.map((city, index) => (
		<tr className="tr" key={index}>
			<td className="td">
				{withLink ? (
					<Link className="table-link" href={city.full_slug}>
						{city.district}
					</Link>
				) : (
					city.district
				)}
			</td>
			<td className="td whitespace-nowrap">
				{Math.round(city.house_buy_avg).toLocaleString("de-DE")} €/m²
			</td>
			<td className="td whitespace-nowrap">
				<PercentageChange value={city.house_buy_change_last_year} />
			</td>
			{colType === "buyrent" && (
				<>
					<td className="td whitespace-nowrap">
						{Number(city.house_rent_avg.toFixed(2)).toLocaleString("de-DE", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}{" "}
						€/m²
					</td>
					<td className="td whitespace-nowrap">
						<PercentageChange value={city.house_rent_change_last_year} />
					</td>
				</>
			)}
			{colType === "minmax" && (
				<>
					<td className="td whitespace-nowrap">
						{Math.round(city.house_buy_min).toLocaleString("de-DE")} €/m²
					</td>
					<td className="td whitespace-nowrap">
						{Math.round(city.house_buy_max).toLocaleString("de-DE")} €/m²
					</td>
				</>
			)}
		</tr>
	));

	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Stadtteil</th>
						<th className="th">⌀ Kaufpreis</th>
						<th className="th">△ Vorjahr</th>
						{colType === "buyrent" && (
							<>
								<th className="th">⌀ Mietpreis</th>
								<th className="th">△ Vorjahr</th>
							</>
						)}
						{colType === "minmax" && (
							<>
								<th className="th">Min</th>
								<th className="th">Max</th>
							</>
						)}
					</tr>
				</thead>

				{rows}
			</table>
		</div>
	);
}

export function TableNeighboringDistrictsApartments({
	neighboringCitiesData,
	withLink,
	sortByDistance = true,
	colType = "buyrent",
}: {
	neighboringCitiesData: NeighboringDistrictPrices[];
	withLink: boolean;
	sortByDistance?: boolean;
	colType?: "minmax" | "buyrent";
}) {
	if (neighboringCitiesData.length === 0) {
		return null;
	}

	const sortedData = neighboringCitiesData.sort((a, b) =>
		sortByDistance ? a.distance - b.distance : 0,
	);

	const rows = sortedData.map((city, index) => (
		<tr className="tr" key={index}>
			<td className="td">
				{withLink ? (
					<Link className="table-link" href={city.full_slug}>
						{city.district}
					</Link>
				) : (
					city.district
				)}
			</td>
			<td className="td whitespace-nowrap">
				{Math.round(city.apartment_buy_avg).toLocaleString("de-DE")} €/m²
			</td>
			<td className="td whitespace-nowrap">
				<PercentageChange value={city.apartment_buy_change_last_year} />
			</td>
			{colType === "buyrent" && (
				<>
					<td className="td whitespace-nowrap">
						{Number(city.apartment_rent_avg.toFixed(2)).toLocaleString(
							"de-DE",
							{
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							},
						)}{" "}
						€/m²
					</td>
					<td className="td whitespace-nowrap">
						<PercentageChange value={city.apartment_rent_change_last_year} />
					</td>
				</>
			)}
			{colType === "minmax" && (
				<>
					<td className="td whitespace-nowrap">
						{Math.round(city.apartment_buy_min).toLocaleString("de-DE")} €/m²
					</td>
					<td className="td whitespace-nowrap">
						{Math.round(city.apartment_buy_max).toLocaleString("de-DE")} €/m²
					</td>
				</>
			)}
		</tr>
	));

	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Stadtteil</th>
						<th className="th">⌀ Kaufpreis</th>
						<th className="th">△ Vorjahr</th>
						{colType === "buyrent" && (
							<>
								<th className="th">⌀ Mietpreis</th>
								<th className="th">△ Vorjahr</th>
							</>
						)}
						{colType === "minmax" && (
							<>
								<th className="th">Min</th>
								<th className="th">Max</th>
							</>
						)}
					</tr>
				</thead>

				{rows}
			</table>
		</div>
	);
}
