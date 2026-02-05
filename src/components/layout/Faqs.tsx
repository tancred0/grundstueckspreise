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
			<Accordion collapsible type="single">
				{faqs.map((faq, index) => (
					<AccordionItem
						key={index}
						className="border-b border-gray-300 last:border-b-0"
						value={`item-${index}`}
					>
						<AccordionTrigger className="text-left hover:no-underline">
							<Typography variant="h2" as="h3" className="my-0 text-2xl ">
								{faq.question}
							</Typography>
						</AccordionTrigger>
						<AccordionContent>
							<PortableTextRenderer input={faq.answer} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
