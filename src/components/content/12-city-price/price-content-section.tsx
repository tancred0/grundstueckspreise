import type { JSX } from "react";
import { PortableTextRenderer } from "@/server/cms/components";
import type { PriceCityData } from "@/server/cms/types";
import type { AddSection } from "@/server/cms/typesLowLevel";
import type { RealEstatePrice } from "@/server/cms/typesTableData";
import { Typography } from "@/components/ui/typography";
import { PriceChart } from "./price-chart";
import { type CombinedPriceData, PriceChartDouble } from "./price-chart-double";

export default function PriceContentSection({
	sectionNumber,
	introSection,
	section,
	section2,
	section3,
	dataPrimary,
	dataSecondary,
	typePrimary,
	typeSecondary,
	heading,
	primaryIsBuy,
	secondaryIsBuy,
	legendTitlePrimary,
	legendTitleSecondary,

	firstTable,
	secondTable,
	thirdTable,
}: {
	sectionNumber: number;
	introSection?: AddSection;
	section: AddSection;
	section2?: AddSection;
	section3?: AddSection;
	dataPrimary: RealEstatePrice[];
	dataSecondary: RealEstatePrice[];
	typePrimary: string;
	typeSecondary: string;
	heading: string;
	primaryIsBuy: boolean;
	secondaryIsBuy: boolean;
	legendTitlePrimary: string;
	legendTitleSecondary: string;

	firstTable?: JSX.Element;
	secondTable?: JSX.Element;
	thirdTable?: JSX.Element;
}) {
	const objectPrimary = Object.fromEntries(
		dataPrimary.map((item) => [item.label, { ...item, type: typePrimary }]),
	);
	const objectSecondary = Object.fromEntries(
		dataSecondary.map((item) => [item.label, { ...item, type: typeSecondary }]),
	);

	const combineData: {
		[key: string]: { primary: RealEstatePrice; secondary: RealEstatePrice };
	} = {};
	for (const k in objectPrimary) {
		combineData[k] = {
			primary: objectPrimary[k]!,
			secondary: objectSecondary[k]!,
		};
	}

	const flattenedData = Object.entries(combineData).map(
		([label, values]) =>
			({
				label,
				year: values.primary.year,
				quarter: values.primary.quarter,
				prevQuarter: values.primary.prevQuarter,
				prevYear: values.primary.prevYear,

				[`primaryPrice`]: values.primary.avg,
				[`primaryPriceLastYear`]: values.primary.avgLastYear,
				[`primaryChange`]: values.primary.change,
				[`primaryChangeYear`]: values.primary.changeYear,
				[`primaryType`]: typePrimary,

				[`secondaryPrice`]: values.secondary.avg,
				[`secondaryPriceLastYear`]: values.secondary.avgLastYear,
				[`secondaryChange`]: values.secondary.change,
				[`secondaryChangeYear`]: values.secondary.changeYear,
				[`secondaryType`]: typeSecondary,
			}) as CombinedPriceData,
	);

	flattenedData.sort((a, b) =>
		a.year !== b.year ? a.year - b.year : a.quarter - b.quarter,
	);

	// for every year
	// get the average of

	return (
		<section id={`sec${sectionNumber}`}>
			<Typography variant="h2">{heading}</Typography>
			{introSection && (
				<PortableTextRenderer className="mb-6" input={introSection.text} />
			)}
			<PriceChartDouble
				combinedData={flattenedData}
				legendTitlePrimary={legendTitlePrimary}
				legendTitleSecondary={legendTitleSecondary}
				primaryIsBuy={primaryIsBuy}
				secondaryIsBuy={secondaryIsBuy}
			/>
			{section.text && <PortableTextRenderer input={section.text} />}
			{firstTable && firstTable}
			{section2 && section2.text && (
				<PortableTextRenderer input={section2.text} />
			)}
			{secondTable && secondTable}
			{section3 && section3.text && (
				<PortableTextRenderer input={section3.text} />
			)}
			{thirdTable && thirdTable}
		</section>
	);
}
