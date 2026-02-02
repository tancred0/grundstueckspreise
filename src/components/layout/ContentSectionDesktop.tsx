"use client";
import Link from "next/link";
import useObserver from "@/hooks/useSectionObserver";
import { cn } from "@/lib/utils";

export default function AsideComponent({
	headings,
	className,
}: {
	headings: (string | null)[];
	className?: string;
}) {
	const { highlightedSection } = useObserver();

	const renderedSections = headings.map((heading, index) => {
		if (heading !== null) {
			const sectionId = `sec${index + 1}`;
			return (
				<Link
					className={`content-section ${
						highlightedSection === sectionId
							? "-ml-[2px] border-blue-90 border-l-2 pl-[calc(1rem+2px)] font-medium text-blue-90"
							: "border-transparent border-l text-gray-80"
					}`}
					href={`#${sectionId}`}
					key={sectionId}
				>
					{heading}
				</Link>
			);
		} else {
			return <></>;
		}
	});

	return (
		<aside
			className={cn("sticky top-40 mb-auto hidden md:block", className)}
			id="aside-section"
		>
			<h3>Inhaltsverzeichnis</h3>
			<div className="flex flex-col gap-y-5 border-neutral-200 border-l-2">
				{renderedSections}
			</div>
		</aside>
	);
}
