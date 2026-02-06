import Link from "next/link";
import { PercentageChange } from "@/components/ui/percentage-change";
import { Typography } from "@/components/ui/typography";
import type { NeighboringDistrictPrices } from "@/server/cms/typesTableData";

export function TableNeighboringDistrictsHouses({
	neighboringCitiesData,
	withLink,
	sortByDistance = true,
	colType = "buyrent",
	groupByBezirk = false,
}: {
	neighboringCitiesData: NeighboringDistrictPrices[];
	withLink: boolean;
	sortByDistance?: boolean;
	colType?: "minmax" | "buyrent";
	groupByBezirk?: boolean;
}) {
	if (neighboringCitiesData.length === 0) {
		return null;
	}

	const renderRow = (city: NeighboringDistrictPrices, index: number) => (
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
				{isNaN(city.house_buy_avg) ? (
					<>–</>
				) : (
					<>
						{Math.round(city.house_buy_avg).toLocaleString("de-DE")} €/m²
					</>
				)}
			</td>
			<td className="td whitespace-nowrap">
				{isNaN(city.house_buy_change_last_year) ? (
					<>–</>
				) : (
					<PercentageChange value={city.house_buy_change_last_year} />
				)}
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
	);

	const renderColGroup = () => (
		<colgroup className="hidden md:table-column-group">
			<col className="w-[30%]" />
			<col className="w-[20%]" />
			<col className="w-[15%]" />
			{colType === "buyrent" && (
				<>
					<col className="w-[20%]" />
					<col className="w-[15%]" />
				</>
			)}
			{colType === "minmax" && (
				<>
					<col className="w-[17.5%]" />
					<col className="w-[17.5%]" />
				</>
			)}
		</colgroup>
	);

	const renderTableHeader = () => (
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
	);

	if (groupByBezirk) {
		// Group data by bezirk
		const groupedData = neighboringCitiesData.reduce(
			(acc, district) => {
				const bezirk = district.bezirk || "Sonstige";
				if (!acc[bezirk]) {
					acc[bezirk] = [];
				}
				acc[bezirk].push(district);
				return acc;
			},
			{} as Record<string, NeighboringDistrictPrices[]>,
		);

		// Sort bezirks alphabetically and sort districts within each group
		const sortedBezirks = Object.keys(groupedData).sort((a, b) =>
			a.localeCompare(b, "de"),
		);

		return (
			<>
				{sortedBezirks.map((bezirk) => {
					const districts = groupedData[bezirk]!.sort((a, b) =>
						a.district.localeCompare(b.district, "de"),
					);
					return (
						<div key={bezirk}>
							<Typography variant="h4" className="mb-0 mt-4">
								{bezirk}
							</Typography>
							<div className="table-container">
								<table className="table md:table-fixed">
									{renderColGroup()}
									{renderTableHeader()}
									<tbody>{districts.map(renderRow)}</tbody>
								</table>
							</div>
						</div>
					);
				})}
			</>
		);
	}

	// Default behavior: single table with optional distance sorting
	const sortedData = neighboringCitiesData.sort((a, b) =>
		sortByDistance ? a.distance - b.distance : 0,
	);

	return (
		<div className="table-container">
			<table className="table">
				{renderTableHeader()}
				<tbody>{sortedData.map(renderRow)}</tbody>
			</table>
		</div>
	);
}

export function TableNeighboringDistrictsApartments({
	neighboringCitiesData,
	withLink,
	sortByDistance = true,
	colType = "buyrent",
	groupByBezirk = false,
}: {
	neighboringCitiesData: NeighboringDistrictPrices[];
	withLink: boolean;
	sortByDistance?: boolean;
	colType?: "minmax" | "buyrent";
	groupByBezirk?: boolean;
}) {
	if (neighboringCitiesData.length === 0) {
		return null;
	}

	const renderRow = (city: NeighboringDistrictPrices, index: number) => (
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
	);

	const renderColGroup = () => (
		<colgroup className="hidden md:table-column-group">
			<col className="w-[30%]" />
			<col className="w-[20%]" />
			<col className="w-[15%]" />
			{colType === "buyrent" && (
				<>
					<col className="w-[20%]" />
					<col className="w-[15%]" />
				</>
			)}
			{colType === "minmax" && (
				<>
					<col className="w-[17.5%]" />
					<col className="w-[17.5%]" />
				</>
			)}
		</colgroup>
	);

	const renderTableHeader = () => (
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
	);

	if (groupByBezirk) {
		// Group data by bezirk
		const groupedData = neighboringCitiesData.reduce(
			(acc, district) => {
				const bezirk = district.bezirk || "Sonstige";
				if (!acc[bezirk]) {
					acc[bezirk] = [];
				}
				acc[bezirk].push(district);
				return acc;
			},
			{} as Record<string, NeighboringDistrictPrices[]>,
		);

		// Sort bezirks alphabetically and sort districts within each group
		const sortedBezirks = Object.keys(groupedData).sort((a, b) =>
			a.localeCompare(b, "de"),
		);

		return (
			<>
				{sortedBezirks.map((bezirk) => {
					const districts = groupedData[bezirk]!.sort((a, b) =>
						a.district.localeCompare(b.district, "de"),
					);
					return (
						<div key={bezirk}>
							<Typography variant="h4" className="mb-0 mt-4">
								{bezirk}
							</Typography>
							<div className="table-container">
								<table className="table md:table-fixed">
									{renderColGroup()}
									{renderTableHeader()}
									<tbody>{districts.map(renderRow)}</tbody>
								</table>
							</div>
						</div>
					);
				})}
			</>
		);
	}

	// Default behavior: single table with optional distance sorting
	const sortedData = neighboringCitiesData.sort((a, b) =>
		sortByDistance ? a.distance - b.distance : 0,
	);

	return (
		<div className="table-container">
			<table className="table">
				{renderTableHeader()}
				<tbody>{sortedData.map(renderRow)}</tbody>
			</table>
		</div>
	);
}
