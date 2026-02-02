import Link from "next/link";
import { PercentageChange } from "@/components/ui/percentage-change";
import type { NeighboringCityPrices } from "@/server/cms/typesTableData";

export function TableNeighboringCitiesBuyPrices({
	neighboringCitiesData,
	sortByDistance = true,
}: {
	neighboringCitiesData: NeighboringCityPrices[];
	sortByDistance?: boolean;
}) {
	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Stadt</th>
						<th className="th">Haus</th>
						<th className="th">△ Vorjahr</th>
						<th className="th">Wohnung</th>
						<th className="th">△ Vorjahr</th>
					</tr>
				</thead>
				<tbody>
					{neighboringCitiesData
						.sort((a, b) => (sortByDistance ? a.distance - b.distance : 0))
						.map((city, index) => (
							<tr className="tr" key={index}>
								<td className="td">
									<Link className="table-link" href={city.full_slug}>
										{city.city}
									</Link>
								</td>
								<td className="td whitespace-nowrap">
									{Math.round(city.house_buy_avg).toLocaleString("de-DE")} €/m²
								</td>

								<td className="td whitespace-nowrap">
									<PercentageChange value={city.house_buy_change_last_year} />
								</td>
								<td className="td whitespace-nowrap">
									{Math.round(city.apartment_buy_avg).toLocaleString("de-DE")}{" "}
									€/m²
								</td>
								<td className="td whitespace-nowrap">
									<PercentageChange
										value={city.apartment_buy_change_last_year}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export function TableNeighboringCitiesRentPrices({
	neighboringCitiesData,
}: {
	neighboringCitiesData: NeighboringCityPrices[];
}) {
	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Stadt</th>
						<th className="th">Haus</th>
						<th className="th">△ Vorjahr</th>
						<th className="th">Wohnung</th>
						<th className="th">△ Vorjahr</th>
					</tr>
				</thead>
				<tbody>
					{neighboringCitiesData
						.sort((a, b) => a.distance - b.distance)
						.map((city, index) => (
							<tr className="tr" key={index}>
								<td className="td">
									<Link className="table-link" href={city.full_slug}>
										{city.city}
									</Link>
								</td>
								<td className="td whitespace-nowrap">
									{Number(city.house_rent_avg.toFixed(2)).toLocaleString(
										"de-DE",
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										},
									)}{" "}
									€/m²
								</td>
								<td className="td whitespace-nowrap">
									<PercentageChange value={city.house_rent_change_last_year} />
								</td>
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
									<PercentageChange
										value={city.apartment_rent_change_last_year}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
