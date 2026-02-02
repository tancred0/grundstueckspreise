"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { PortableTextRenderer } from "@/server/cms/components";
import type { Faq } from "@/server/cms/typesLowLevel";

export default function Faqs({
	heading,
	faqs,
	sectionNumber,
}: {
	heading: string | null;
	faqs: Faq[];
	sectionNumber?: number;
}) {
	return (
		<section id={`sec${sectionNumber}`}>
			<Typography variant="h2">{heading}</Typography>
			{faqs.map((faq, index) => (
				<Accordion collapsible key={index} type="single">
					<AccordionItem
						className={`border-gray-600 ${index === faqs.length - 1 ? "border-0" : ""}`}
						value="item-1"
					>
						<AccordionTrigger className="text-left">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent>
							<PortableTextRenderer input={faq.answer} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</section>
	);
}
