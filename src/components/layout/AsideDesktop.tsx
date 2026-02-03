"use client";
import Link from "next/link";
import useObserver from "@/hooks/useSectionObserver";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export default function AsideDesktop({
	headings,
	breadcrumbs,
	className,
}: {
	headings: (string | null)[];
	breadcrumbs?: React.ReactNode;
	className?: string;
}) {
	const { highlightedSection } = useObserver();

	const renderedSections = headings.map((heading, index) => {
		if (heading !== null) {
			const sectionId = `sec${index + 1}`;
			return (
				<Link
					className={`content-section pl-4 ${
						highlightedSection === sectionId
							? "-ml-[2px] border-primary border-l-2 font-medium text-primary"
							: "border-transparent border-l text-gray-500"
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
		<>
			{/* Desktop aside with breadcrumbs */}
			<aside className={cn("hidden md:block", className)} id="aside-section">
				<div className="sticky top-[117px]">
					{breadcrumbs}
					<Typography variant="h3" as="div">Inhaltsverzeichnis</Typography>
					<div className="flex flex-col gap-y-5 border-neutral-200 border-l-2">
						{renderedSections}
					</div>
				</div>
			</aside>
			{/* Mobile breadcrumbs */}
			<div className="col-span-4 md:hidden">
				{breadcrumbs}
			</div>
		</>
	);
}
