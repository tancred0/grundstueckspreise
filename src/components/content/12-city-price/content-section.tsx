import type { JSX } from "react";
import { PortableTextRenderer } from "@/server/cms/components";
import type { AddSection } from "@/server/cms/typesLowLevel";
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
			<h2>{heading}</h2>
			{section && section.text && <PortableTextRenderer input={section.text} />}
			{renderBelow && renderBelow}
		</section>
	);
}
