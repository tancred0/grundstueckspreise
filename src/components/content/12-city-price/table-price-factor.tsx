import { PercentageChange } from "@/components/ui/percentage-change";
import type { RealEstatePrice } from "@/server/cms/typesTableData";
import { calculateYearlyAveragesWithChange } from "./calculateYearlyAverages";

interface CombinedDataType {
	year: number;
	rentAvg: number;
	rentChange: number | null;
	buyAvg: number | null;
	buyChange: number | null;
	buyFactor: number | null;
	buyFactorChange?: number | null;
}

export function TablePricesFactor({
	houseRentData,
	houseBuyData,
}: {
	houseRentData: RealEstatePrice[];
	houseBuyData: RealEstatePrice[];
}) {
	const rentAverageWithChange =
		calculateYearlyAveragesWithChange(houseRentData);
	const buyAverageWithChange = calculateYearlyAveragesWithChange(houseBuyData);

	// combine the two arrays based on the year
	let combinedData: CombinedDataType[] = rentAverageWithChange.map((rent) => {
		const buyData = buyAverageWithChange.find((buy) => buy.year === rent.year);
		return {
			year: rent.year,
			rentAvg: rent.avg,
			rentChange: rent.change,
			buyAvg: buyData?.avg ?? null,
			buyChange: buyData?.change ?? null,
			buyFactor: buyData?.avg ? buyData.avg / rent.avg / 12 : null,
		};
	});
	combinedData = combinedData.sort((a, b) => a.year - b.year);

	// add a buyFactorChange to the combinedData
	combinedData = combinedData.map((item, index) => {
		if (index === 0) return { ...item, buyFactorChange: null };
		const prevItem = combinedData[index - 1]!;
		const buyFactorChange =
			item.buyFactor && prevItem.buyFactor
				? ((item.buyFactor - prevItem.buyFactor) / prevItem.buyFactor) * 100
				: null;
		return { ...item, buyFactorChange };
	});

	// and drop the first year
	combinedData = combinedData.slice(1);

	return (
		<div className="table-container">
			<table className="table">
				<thead className="header-row">
					<tr>
						<th className="th">Jahr</th>
						<th className="th">⌀ Kaufpreis</th>
						<th className="th">⌀ Mietpreis</th>
						<th className="th">⌀ Faktor</th>
						<th className="th">△ Vorjahr</th>
					</tr>
				</thead>
				<tbody>
					{combinedData.map((yearData) => (
						<tr className="tr" key={yearData.year}>
							<td className="td">{yearData.year}</td>
							<td className="td whitespace-nowrap">
								{yearData.buyAvg
									? yearData.buyAvg.toLocaleString("de-DE", {
											minimumFractionDigits: 0,
											maximumFractionDigits: 0,
										})
									: "-"}{" "}
								€/m²
							</td>
							<td className="td whitespace-nowrap">
								{yearData.rentAvg
									? yearData.rentAvg.toLocaleString("de-DE", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})
									: "-"}{" "}
								€/m²
							</td>
							<td className="td whitespace-nowrap">
								{yearData.buyFactor !== null
									? yearData.buyFactor.toFixed(1)
									: "-"}
							</td>
							<td className="td whitespace-nowrap">
								{yearData.buyFactorChange && (
									<PercentageChange value={yearData.buyFactorChange} />
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
