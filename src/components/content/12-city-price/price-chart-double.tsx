"use client";

import { useMemo, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";
import { PiBuildingLight, PiHouseLineLight, PiKeyLight } from "react-icons/pi";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import type { RealEstatePrice } from "@/server/cms/typesTableData";

function formatPrice(price: number, rounding: number = 0) {
	return price.toLocaleString("de-DE", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: rounding,
		maximumFractionDigits: rounding,
	});
}

// Map of labels → icons
const PRICE_ICONS = {
	Häuser: PiHouseLineLight,
	Wohnungen: PiBuildingLight,
	Kaufen: PiKeyLight,
	Mieten: HiOutlineDocumentText,
} as const;

export type CombinedPriceData = {
	label: string;
	year: number;
	quarter: number;
	prevQuarter: string;
	prevYear: string;
	primaryPrice: number;
	primaryPriceLastYear: number;
	primaryChange: number;
	primaryChangeYear: number;
	primaryType: keyof typeof PRICE_ICONS;
	secondaryPrice: number;
	secondaryPriceLastYear: number;
	secondaryChange: number;
	secondaryChangeYear: number;
	secondaryType: keyof typeof PRICE_ICONS;
};

function PriceCard({
	data,
	kind,
	isBuy,
}: {
	data: CombinedPriceData;
	kind: "primary" | "secondary";
	isBuy: boolean;
}) {
	const isPrimary = kind === "primary";
	const price = isPrimary ? data.primaryPrice : data.secondaryPrice;
	const change = isPrimary ? data.primaryChange : data.secondaryChange;
	const changeYear = isPrimary
		? data.primaryChangeYear
		: data.secondaryChangeYear;
	const prevLabel = isPrimary ? data.prevQuarter : data.prevYear;
	const typeKey = isPrimary ? data.primaryType : data.secondaryType;
	const Icon = PRICE_ICONS[typeKey];

	return (
		<div className="rounded-lg border bg-white p-4 shadow-lg">
			<div className="mb-4 flex items-center gap-2">
				<Icon className="h-5 w-5 text-gray-500" />
				<span className="font-semibold text-gray-900 text-lg">{typeKey}</span>
			</div>
			<div className="space-y-2">
				<div className="font-semibold text-base text-gray-900">
					{formatPrice(price, isBuy ? 0 : 2)}
					/m²
				</div>
				<span className="text-gray-400 text-xs">{data.label}</span>
				<div className="space-y-1 text-gray-500 text-sm">
					<div className="flex gap-4">
						{change && (
							<div className="flex flex-col items-start">
								<div className="flex items-center gap-1">
									<span className="text-gray-400 text-xs">Q</span>
									<div
										className={`inline-flex items-center ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}
									>
										{change >= 0 ? (
											<LuArrowUpRight className="h-4 w-4" />
										) : (
											<LuArrowDownRight className="h-4 w-4" />
										)}
										{change}%
									</div>
								</div>
								{/* <span className="text-xs text-gray-400">{data.prevQuarter}</span> */}
							</div>
						)}
						{changeYear && (
							<div className="flex flex-col items-center">
								<div className="flex items-center gap-1">
									<span className="text-gray-400 text-xs">Y</span>
									<div
										className={`inline-flex items-center ${changeYear >= 0 ? "text-emerald-600" : "text-red-600"}`}
									>
										{changeYear > 0 ? (
											<LuArrowUpRight className="h-4 w-4" />
										) : (
											<LuArrowDownRight className="h-4 w-4" />
										)}
										{changeYear}%
									</div>
								</div>
								{/* <span className="text-xs text-gray-400">{data.prevYear}</span> */}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// **Shared** tooltip content for both lines:
function CustomTooltipContent({
	active,
	payload,
	primaryIsBuy,
	secondaryIsBuy,
}: {
	active?: boolean;
	payload?: any[];
	primaryIsBuy?: boolean;
	secondaryIsBuy?: boolean;
}) {
	if (!active || !payload || !payload.length) return null;
	const { payload: point } = payload[0];
	const secondary = payload[1]?.payload;

	const PrimaryIcon =
		PRICE_ICONS[point.primaryType as keyof typeof PRICE_ICONS];
	const SecondaryIcon =
		PRICE_ICONS[secondary?.secondaryType as keyof typeof PRICE_ICONS];

	const showRatio = primaryIsBuy !== secondaryIsBuy;
	const scaleFactorRatio = primaryIsBuy && !secondaryIsBuy ? 12 : 1;
	const ratio =
		point.primaryPrice / secondary?.secondaryPrice / scaleFactorRatio;
	const ratioLastYear =
		point.primaryPriceLastYear /
		secondary?.secondaryPriceLastYear /
		scaleFactorRatio;
	const ratioChange = ((ratio / ratioLastYear - 1) * 100).toFixed(1);
	const isRatioIncreased = ratio > ratioLastYear;

	return (
		<div className="hidden min-w-[300px] rounded-lg border bg-white p-4 shadow-lg md:block">
			<div className="mb-4">
				<div className="font-medium text-base">{point.label}</div>
			</div>

			<div className="space-y-4">
				{/* Price Comparison Section */}
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<PrimaryIcon className="h-5 w-5 text-gray-500" />
						<span className="font-medium text-base text-gray-900">
							{formatPrice(point.primaryPrice, primaryIsBuy ? 0 : 2)}/m²
						</span>
						{point.primaryChangeYear && (
							<span
								className={`flex items-center gap-1 text-xs ${point.primaryChangeYear >= 0 ? "text-emerald-600" : "text-red-600"}`}
							>
								{point.primaryChangeYear >= 0 ? (
									<LuArrowUpRight className="h-4 w-4" />
								) : (
									<LuArrowDownRight className="h-4 w-4" />
								)}
								{point.primaryChangeYear}%
							</span>
						)}
					</div>

					{secondary && (
						<div className="flex items-center gap-2">
							<SecondaryIcon className="h-5 w-5 text-gray-500" />
							<span className="font-medium text-base text-gray-900">
								{formatPrice(secondary.secondaryPrice, secondaryIsBuy ? 0 : 2)}
								/m²
							</span>
							{secondary.secondaryChangeYear && (
								<span
									className={`flex items-center gap-1 text-xs ${secondary.secondaryChangeYear >= 0 ? "text-emerald-600" : "text-red-600"}`}
								>
									{secondary.secondaryChangeYear >= 0 ? (
										<LuArrowUpRight className="h-4 w-4" />
									) : (
										<LuArrowDownRight className="h-4 w-4" />
									)}
									{secondary.secondaryChangeYear}%
								</span>
							)}
						</div>
					)}
				</div>

				{/* Ratio Section */}
				{showRatio && (
					<div className="space-y-2 border-t pt-3">
						<div className="flex items-center justify-between">
							<span className="text-gray-600 text-sm">Kaufpreisfaktor:</span>
							<span className="font-medium">{ratio.toFixed(2)}x</span>
						</div>
						{!isNaN(ratioLastYear) && (
							<>
								<div className="flex items-center justify-between">
									<span className="text-gray-600 text-sm">
										Vorjahresverhältnis:
									</span>
									<span className="text-gray-500">
										{ratioLastYear.toFixed(2)}x
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-gray-600 text-sm">Veränderung:</span>
									<div
										className={`flex items-center gap-1 ${isRatioIncreased ? "text-emerald-600" : "text-red-600"}`}
									>
										{isRatioIncreased ? (
											<LuArrowUpRight className="h-4 w-4" />
										) : (
											<LuArrowDownRight className="h-4 w-4" />
										)}
										<span className="font-medium">{ratioChange}%</span>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export function PriceChartDouble({
	combinedData,
	primaryIsBuy,
	secondaryIsBuy,
	legendTitlePrimary,
	legendTitleSecondary,
}: {
	combinedData: CombinedPriceData[];
	primaryIsBuy: boolean;
	secondaryIsBuy: boolean;
	legendTitlePrimary: string;
	legendTitleSecondary: string;
}) {
	const [activeLabel, setActiveLabel] = useState<string | null>(null);

	// # if they are the same , we just use one axis
	const secondAxis = primaryIsBuy !== secondaryIsBuy;
	const scaleFactorPrimary = primaryIsBuy ? 100 : 1;
	const scaleFactorSecondary = secondaryIsBuy ? 100 : 1;

	const minPrimary =
		Math.floor(
			Math.min(...combinedData.map((d) => d.primaryPrice)) / scaleFactorPrimary,
		) * scaleFactorPrimary;
	const maxPrimary =
		Math.ceil(
			Math.max(...combinedData.map((d) => d.primaryPrice)) / scaleFactorPrimary,
		) * scaleFactorPrimary;

	const minSecondary =
		Math.floor(
			Math.min(...combinedData.map((d) => d.secondaryPrice)) /
				scaleFactorSecondary,
		) * scaleFactorSecondary;
	const maxSecondary =
		Math.ceil(
			Math.max(...combinedData.map((d) => d.secondaryPrice)) /
				scaleFactorSecondary,
		) * scaleFactorSecondary;

	// const chartData = combinedData.map((d) => ({
	//   ...d,
	//   secondaryPriceScaled: scaleSmallerValues ? d.secondaryPrice / minSecondary * minPrimary : d.secondaryPrice,
	// }))

	// minSecondary = Math.floor(Math.min(...chartData.map((d) => d.secondaryPriceScaled)) / scaleFactorYAxis) * scaleFactorYAxis * 0.9
	// maxSecondary = Math.ceil(Math.max(...chartData.map((d) => d.secondaryPriceScaled)) / scaleFactorYAxis) * scaleFactorYAxis * 1.1
	// const minY = Math.min(minPrimary, minSecondary)
	// const maxY = Math.max(maxPrimary, maxSecondary)

	const leftAxisMin = secondAxis
		? minPrimary
		: Math.min(minPrimary, minSecondary);
	const leftAxisMax = secondAxis
		? maxPrimary
		: Math.max(maxPrimary, maxSecondary);

	// 3. Config for two lines
	const chartConfig: ChartConfig = {
		line1: {
			label: legendTitlePrimary,
			color: "hsl(var(--chart-4))",
		},
		line2: {
			label: legendTitleSecondary,
			color: "hsl(var(--chart-3))",
		},
	};

	// 4. Active data point for cards:
	const activeData = useMemo(
		() =>
			(combinedData.find((d) => d.label === activeLabel) ??
			combinedData[combinedData.length - 1])!,
		[activeLabel, combinedData],
	);

	return (
		<div className="flex flex-col gap-0">
			{/* cards row */}

			<div className="my-6 flex justify-center gap-6">
				<div className="flex items-center gap-2">
					<div
						className="h-3 w-3 rounded-full"
						style={{ backgroundColor: chartConfig.line1!.color }}
					/>
					<span className="text-gray-600 text-sm">
						{chartConfig.line1!.label}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="h-3 w-3 rounded-full"
						style={{ backgroundColor: chartConfig.line2!.color }}
					/>
					<span className="text-gray-600 text-sm">
						{chartConfig.line2!.label}
					</span>
				</div>
			</div>

			{/* @ts-ignore */}
			<ChartContainer className="mb-8 max-h-[33vh]" config={chartConfig}>
				<AreaChart
					data={combinedData}
					margin={{ left: 12, right: 12 }}
					onMouseLeave={() => setActiveLabel(null)}
					onMouseMove={(e) => {
						if (e?.activeLabel) {
							setActiveLabel(e.activeLabel.toString());
						}
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						axisLine={false}
						dataKey="label"
						tickLine={false}
						tickMargin={4}
					/>
					<YAxis
						allowDataOverflow
						axisLine={false}
						domain={[leftAxisMin, leftAxisMax]}
						orientation="left"
						tickFormatter={(v) =>
							primaryIsBuy ? `${(v / 1000).toFixed(1)}k €` : `${v.toFixed(2)} €`
						}
						tickLine={false}
						yAxisId="left"
					/>
					{secondAxis && (
						<YAxis
							allowDataOverflow
							axisLine={false}
							domain={[minSecondary, maxSecondary]}
							orientation="right"
							tickFormatter={(v) =>
								secondaryIsBuy ? `${(v / 1000).toFixed(1)}k €` : `${v.toFixed(2)} €`
							}
							tickLine={false}
							yAxisId="right"
						/>
					)}

					<ChartTooltip
						content={
							<CustomTooltipContent
								primaryIsBuy={primaryIsBuy}
								secondaryIsBuy={secondaryIsBuy}
							/>
						}
						cursor
					/>
					<defs>
						<linearGradient id="fillGradient1" x1="0" x2="0" y1="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-line1)"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-line1)"
								stopOpacity={0.1}
							/>
						</linearGradient>
						<linearGradient id="fillGradient2" x1="0" x2="0" y1="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-line2)"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-line2)"
								stopOpacity={0.1}
							/>
						</linearGradient>
					</defs>
					<Area
						activeDot={{ r: 6, fill: "var(--color-line1)", stroke: "#fff" }}
						dataKey="primaryPrice"
						dot={{ r: 4, fill: "var(--color-line1)" }}
						fill="url(#fillGradient1)"
						stackId="a"
						stroke="var(--color-line1)"
						type="natural"
						yAxisId="left"
					/>
					<Area
						activeDot={{
							r: 6,
							fill: "var(--color-line2)",
							stroke: "#fff",
						}}
						dataKey="secondaryPrice"
						dot={{ r: 4, fill: "var(--color-line2)" }}
						fill="url(#fillGradient2)"
						stackId="b"
						stroke="var(--color-line2)"
						type="natural"
						yAxisId={secondAxis ? "right" : "left"}
					/>
				</AreaChart>
			</ChartContainer>

			<div className="mb-4 grid gap-4 md:grid-cols-2">
				<PriceCard data={activeData} isBuy={primaryIsBuy} kind="primary" />
				<PriceCard data={activeData} isBuy={secondaryIsBuy} kind="secondary" />
			</div>
		</div>
	);
}

// Apartments: Blues (buy: #0066CC, rent: #6699FF)
// Houses: Greens (buy: #006633, rent: #66CC99)
