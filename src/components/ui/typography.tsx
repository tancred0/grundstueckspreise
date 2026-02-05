import type React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "p"
	| "lead"
	| "large"
	| "small"
	| "muted"
	| "ul"
	| "ol";

type HTMLElementTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "small" | "ul" | "ol";

const variantStyles: Record<TypographyVariant, string> = {
	h1: "scroll-mt-20 text-4xl font-semibold tracking-tight lg:text-5xl md:mb-6",
	h2: "scroll-mt-20 text-3xl font-semibold tracking-tight my-4",
	h3: "scroll-mt-20 text-[28px] font-semibold tracking-tight my-3",
	h4: "scroll-mt-20 text-2xl font-semibold tracking-tight my-2",
	p: "text-xl leading-relaxed text-gray-700 [&:not(:first-child)]:mt-4",
	lead: "text-xl text-muted-foreground",
	large: "text-lg font-semibold",
	small: "text-sm font-medium leading-none",
	muted: "text-sm text-muted-foreground",
	ul: "my-4 ml-6 list-disc text-xl leading-relaxed text-gray-700 [&>li]:mt-2",
	ol: "my-4 ml-6 list-decimal text-xl leading-relaxed text-gray-700 [&>li]:mt-2",
};

const variantElements: Record<TypographyVariant, HTMLElementTag> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	p: "p",
	lead: "p",
	large: "div",
	small: "small",
	muted: "p",
	ul: "ul",
	ol: "ol",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	variant?: TypographyVariant;
	as?: HTMLElementTag;
}

export function Typography({
	variant = "p",
	as,
	className,
	children,
	...props
}: TypographyProps) {
	const Tag = as ?? variantElements[variant];
	return (
		<Tag className={cn(variantStyles[variant], className)} {...props}>
			{children}
		</Tag>
	);
}

type SectionSpacing = "sm" | "md";

const sectionSpacingStyles: Record<SectionSpacing, string> = {
	sm: "py-3 md:py-4",
	md: "py-6 md:py-8",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	spacing?: SectionSpacing;
}

export function Section({
	spacing = "sm",
	className,
	children,
	...props
}: SectionProps) {
	return (
		<section className={cn(sectionSpacingStyles[spacing], className)} {...props}>
			{children}
		</section>
	);
}
