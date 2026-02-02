import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function MobileContentSection({
	headings,
}: {
	headings: (string | null)[];
}) {
	const renderedSections = headings.map((heading, index) => {
		if (heading !== null) {
			const sectionId = `sec${index + 1}`;
			return (
				<a
					className="w-full text-gray-80 text-sm"
					href={`#${sectionId}`}
					key={sectionId}
				>
					{heading}
				</a>
			);
		} else {
			return <></>;
		}
	});

	return (
		<nav className="mx-2 md:hidden">
			<Accordion collapsible type="single">
				<AccordionItem value="item-1">
					<AccordionTrigger>Inhaltsverzeichnis</AccordionTrigger>
					{renderedSections.map((section, index) => (
						<AccordionContent key={index}>{section}</AccordionContent>
					))}
				</AccordionItem>
			</Accordion>
		</nav>
	);
}
