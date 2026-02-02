import type { JSX } from "react";
import { PortableTextRenderer } from "@/server/cms/components";
import type { AddSection } from "@/server/cms/typesLowLevel";
import { Typography } from "@/components/ui/typography";
import CTA from "../general/CTA";

export default function ContentSection({
	sectionNumber,
	heading,
	section,
	renderBelow,
}: {
	sectionNumber: number;
	heading: string;
	section: AddSection;
	renderBelow?: JSX.Element;
}) {
	return (
		<section id={`sec${sectionNumber}`}>
			<Typography variant="h2">{heading}</Typography>
			{section && section.text && <PortableTextRenderer input={section.text} />}
			{renderBelow && renderBelow}
		</section>
	);
}
