import { PercentageChange } from "@/components/ui/percentage-change";
import type { RealEstatePrice } from "@/server/cms/typesTableData";
import { calculateYearlyAveragesWithChange } from "./calculateYearlyAverages";

export function TablePricesChange({
	houseRentData,
	type,
}: {
	houseRentData: RealEstatePrice[];
	type: "buy" | "rent";
}) {
	const rentAverageWithChange =
		calculateYearlyAveragesWithChange(houseRentData).slice(1);
	const roundTo = type === "buy" ? 0 : 2;
	const title = type === "buy" ? "⌀ Kaufpreis" : "⌀ Mietpreis";

	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Jahr</th>
						<th className="th">{title}</th>
						<th className="th">△ Vorjahr</th>
						<th className="th">Min</th>
						<th className="th">Max</th>
					</tr>
				</thead>
				<tbody>
					{rentAverageWithChange.map((yearData) => (
						<tr className="tr" key={yearData.year}>
							<td className="td">{yearData.year}</td>
							<td className="td whitespace-nowrap">
								{Number(yearData.avg.toFixed(roundTo)).toLocaleString("de-DE", {
									minimumFractionDigits: roundTo,
									maximumFractionDigits: roundTo,
								})}{" "}
								€/m²
							</td>
							<td className="td whitespace-nowrap">
								{yearData.change === null ? (
									"-"
								) : (
									<PercentageChange value={yearData.change} />
								)}
							</td>
							<td className="td whitespace-nowrap">
								{Number(yearData.min.toFixed(roundTo)).toLocaleString("de-DE", {
									minimumFractionDigits: roundTo,
									maximumFractionDigits: roundTo,
								})}{" "}
								€/m²
							</td>
							<td className="td whitespace-nowrap">
								{Number(yearData.max.toFixed(roundTo)).toLocaleString("de-DE", {
									minimumFractionDigits: roundTo,
									maximumFractionDigits: roundTo,
								})}{" "}
								€/m²
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
