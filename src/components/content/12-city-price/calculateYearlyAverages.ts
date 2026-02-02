import type { RealEstatePrice } from "@/server/cms/typesTableData";

interface YearlyAverage {
	year: number;
	avg: number;
	max: number;
	min: number;
}

interface YearlyAverageWithChange extends YearlyAverage {
	change: number | null;
}

export function calculateYearlyAveragesWithChange(
	data: RealEstatePrice[],
): YearlyAverageWithChange[] {
	// Group by year and calculate values in a single pass
	const dataByYear = data.reduce(
		(acc, curr) => {
			if (!acc[curr.year]) {
				acc[curr.year] = {
					sum: 0,
					count: 0,
					max: -Infinity,
					min: Infinity,
				};
			}

			const yearData = acc[curr.year]!;
			// Only add the average to the sum
			yearData.sum += curr.avg;
			yearData.count += 1;
			// Update max and min separately
			yearData.max = Math.max(yearData.max, curr.max);
			yearData.min = Math.min(yearData.min, curr.min);

			return acc;
		},
		{} as Record<
			number,
			{ sum: number; count: number; max: number; min: number }
		>,
	);

	// Convert to yearly averages
	const yearlyAverages: YearlyAverage[] = Object.entries(dataByYear)
		.map(([year, stats]) => ({
			year: parseInt(year),
			avg: stats.sum / stats.count,
			max: stats.max,
			min: stats.min,
		}))
		.sort((a, b) => a.year - b.year);

	// Add year-over-year changes
	return yearlyAverages.map((year) => {
		const previousYear = yearlyAverages.find((y) => y.year === year.year - 1);
		return {
			...year,
			change: previousYear
				? ((year.avg - previousYear.avg) / previousYear.avg) * 100
				: null,
		};
	});
}
