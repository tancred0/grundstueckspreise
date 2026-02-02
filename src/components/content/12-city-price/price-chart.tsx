"use client";

import { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { PiBuildingLight, PiHouseLineLight, PiKeyLight } from "react-icons/pi";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import type { RealEstatePrice } from "@/server/cms/typesTableData";

const PRICE_ICONS = {
	Häuser: PiHouseLineLight,
	Wohnungen: PiBuildingLight,
	Kaufen: PiKeyLight,
	Mieten: HiOutlineDocumentText,
};

function PriceCard({
	activeData,
	type,
}: {
	activeData: RealEstatePrice;
	type: string | null;
}) {
	const Icon = type ? PRICE_ICONS[type as keyof typeof PRICE_ICONS] : null;
	return (
		<div className="rounded-lg border bg-white p-4 shadow-lg">
			<div className="mb-4 flex items-center gap-2">
				{Icon && <Icon className="h-5 w-5 text-gray-500" />}
				<span className="font-semibold text-gray-900 text-lg">{type}</span>
			</div>

			<div className="space-y-2">
				<div className="font-semibold text-base">
					{activeData.avg.toLocaleString("de-DE", {
						style: "currency",
						currency: "EUR",
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
					/m²
				</div>
				<span className="text-gray-400 text-xs">{activeData.label}</span>

				<div className="space-y-1 text-gray-500 text-sm">
					<div className="flex gap-4">
						{activeData.change && (
							<div className="flex flex-col items-start">
								<div className="flex items-center gap-1">
									<span className="text-gray-400 text-xs">Q</span>
									<span
										className={`${Number(activeData.change) >= 0 ? "text-emerald-600" : "text-red-600"}`}
									>
										{activeData.change > 0 ? "+" : ""}
										{activeData.change}%
									</span>
								</div>
								<span className="text-gray-400 text-xs">
									{activeData.prevQuarter}
								</span>
							</div>
						)}

						{activeData.changeYear && (
							<div className="flex flex-col items-center">
								<div className="flex items-center gap-1">
									<span className="text-gray-400 text-xs">Y</span>
									<span
										className={`${Number(activeData.changeYear) >= 0 ? "text-emerald-600" : "text-red-600"}`}
									>
										{activeData.changeYear > 0 ? "+" : ""}
										{activeData.changeYear}%
									</span>
								</div>
								<span className="text-gray-400 text-xs">
									{activeData.prevYear}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function CustomTooltipContent({
	active,
	payload,
	onLabelChange,
}: {
	active?: boolean;
	payload?: any[];
	onLabelChange?: (label: string) => void;
}) {
	if (!active || !payload || !payload[0]) return null;

	const primaryData = payload[0];
	const secondaryData = payload.length > 1 ? payload[1] : null;
	const currentData = primaryData.payload;
	const currentLabel = currentData.label;
	const primaryValue = primaryData.value;
	const secondaryValue = secondaryData?.value;

	if (onLabelChange && currentLabel) {
		onLabelChange(currentLabel);
	}

	const primaryType = currentData.typePrimary;
	const secondaryType = currentData.typeSecondary;
	const PrimaryIcon = PRICE_ICONS[primaryType as keyof typeof PRICE_ICONS];
	const SecondaryIcon = secondaryType
		? PRICE_ICONS[secondaryType as keyof typeof PRICE_ICONS]
		: null;

	return (
		<div className="min-w-[300px] rounded-lg border bg-white p-4 shadow-lg">
			<div className="my-2 text-base">{currentData.label}</div>
			<div className="grid grid-cols-2 gap-4">
				{/* Primary Data */}
				<div>
					<div className="mb-4 flex items-center gap-2">
						<PrimaryIcon className="h-5 w-5 text-gray-500" />
						<span className="font-semibold text-gray-900 text-lg">
							{primaryType}
						</span>
					</div>

					<div className="space-y-2">
						<div className="font-semibold text-base">
							{primaryValue.toLocaleString("de-DE", {
								style: "currency",
								currency: "EUR",
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							})}
							/m²
						</div>
					</div>
				</div>

				{/* Secondary Data */}
				{secondaryValue && SecondaryIcon && (
					<div>
						<div className="mb-4 flex items-center gap-2">
							<SecondaryIcon className="h-5 w-5 text-gray-500" />
							<span className="font-semibold text-gray-900 text-lg">
								{secondaryType}
							</span>
						</div>

						<div className="space-y-2">
							<div className="font-semibold text-base">
								{secondaryValue.toLocaleString("de-DE", {
									style: "currency",
									currency: "EUR",
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								})}
								/m²
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

interface ChartLineConfig {
	label: string;
	color: string;
}

type PriceChartConfig = {
	[key: `line${number}`]: ChartLineConfig;
};

export function PriceChart({
	dataPrimary,
	typePrimary,
	dataSecondary = null,
	typeSecondary = null,
}: {
	dataPrimary: RealEstatePrice[];
	dataSecondary?: RealEstatePrice[] | null;
	typePrimary: string;
	typeSecondary?: string | null;
}) {
	const [activeDataPoint, setActiveDataPoint] =
		useState<RealEstatePrice | null>(null);

	const primaryDataFull = dataPrimary.slice(
		dataPrimary.length - 20,
		dataPrimary.length,
	);
	const secondaryDataFull = dataSecondary?.slice(
		dataSecondary.length - 20,
		dataSecondary.length,
	);

	const chartData = primaryDataFull.map((item, index) => {
		const dataPoint = {
			label: item.label,
			[typePrimary]: Math.round(item.avg),
			primaryChange: item.change,
			primaryChangeYear: item.changeYear,
			prevQuarter: item.prevQuarter,
			prevYear: item.prevYear,
			typePrimary: typePrimary,
		};

		// Add secondary data if available
		if (dataSecondary && typeSecondary && dataSecondary[index]) {
			const secondaryItem = dataSecondary[index];
			dataPoint[typeSecondary] = Math.round(secondaryItem.avg);
			dataPoint.secondaryChange = secondaryItem.change;
			dataPoint.secondaryChangeYear = secondaryItem.changeYear;
			dataPoint.secondaryPrevQuarter = secondaryItem.prevQuarter;
			dataPoint.secondaryPrevYear = secondaryItem.prevYear;
			dataPoint.typeSecondary = typeSecondary;
		}

		return dataPoint;
	});

	const minValue =
		Math.floor(
			Math.min(
				...dataPrimary.map((item) => item.avg),
				...(dataSecondary ? dataSecondary.map((item) => item.avg) : []),
			) / 100,
		) * 100;

	const maxValue =
		Math.ceil(
			Math.max(
				...dataPrimary.map((item) => item.avg),
				...(dataSecondary ? dataSecondary.map((item) => item.avg) : []),
			) / 100,
		) * 100;

	let chartConfig: PriceChartConfig = {
		line1: {
			label: "Durchschnittspreis in €/m²: ",
			color: "hsl(var(--chart-3))",
		},
	};

	if (typeSecondary) {
		chartConfig = {
			...chartConfig,
			line2: {
				label: "Vergleichspreis in €/m²: ",
				color: "hsl(var(--chart-1))",
			},
		};
	}

	// Handle label change from tooltip
	const handleLabelChange = (label: string) => {
		const foundDataPoint = dataPrimary.find((item) => item.label === label);
		if (foundDataPoint) {
			setActiveDataPoint(foundDataPoint);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{/* Display the active data */}
			<div className="grid grid-cols-2 gap-4">
				<PriceCard
					activeData={
						(activeDataPoint ?? primaryDataFull[primaryDataFull.length - 1])!
					}
					type={typePrimary}
				/>
				{secondaryDataFull && (
					<PriceCard
						activeData={
							(activeDataPoint ?? secondaryDataFull[secondaryDataFull.length - 1])!
						}
						type={typeSecondary}
					/>
				)}
			</div>
			<ChartContainer config={chartConfig}>
				<AreaChart
					accessibilityLayer
					data={chartData}
					margin={{
						left: 12,
						right: 12,
					}}
					onMouseLeave={() => setActiveDataPoint(null)}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						axisLine={false}
						dataKey="label"
						tickLine={false}
						tickMargin={4}
					/>
					<YAxis
						allowDataOverflow={true}
						axisLine={false}
						domain={[minValue, maxValue]}
						padding={{ top: 0, bottom: 0 }}
						scale="linear"
						tickFormatter={(value) =>
							Math.round(value).toLocaleString("de-DE", {
								style: "currency",
								currency: "EUR",
							})
						}
						tickLine={false}
						type="number"
					/>
					<ChartTooltip
						content={<CustomTooltipContent onLabelChange={handleLabelChange} />}
						cursor={true}
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
						{typeSecondary && (
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
						)}
					</defs>
					<Area
						activeDot={{
							r: 6,
							fill: "var(--color-line1)",
							stroke: "white",
						}}
						dataKey={typePrimary}
						dot={{
							r: 4,
							fill: "var(--color-line1)",
							strokeWidth: 0,
							stroke: "var(--color-line1)",
						}}
						fill="url(#fillGradient1)"
						fillOpacity={0.2}
						stackId="a"
						stroke="var(--color-line1)"
						type="natural"
					/>
					{typeSecondary && (
						<Area
							activeDot={{
								r: 6,
								fill: "var(--color-line2)",
								stroke: "white",
							}}
							dataKey={typeSecondary}
							dot={{
								r: 4,
								fill: "var(--color-line2)",
								strokeWidth: 0,
								stroke: "var(--color-line2)",
							}}
							fill="url(#fillGradient2)"
							fillOpacity={0.2}
							stackId="b"
							stroke="var(--color-line2)"
							type="natural"
						/>
					)}
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
