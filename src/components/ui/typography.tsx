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
	| "muted";

type HTMLElementTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "small";

const variantStyles: Record<TypographyVariant, string> = {
	h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
	h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
	h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
	h4: "scroll-m-20 text-xl font-semibold tracking-tight",
	p: "leading-7 [&:not(:first-child)]:mt-6",
	lead: "text-xl text-muted-foreground",
	large: "text-lg font-semibold",
	small: "text-sm font-medium leading-none",
	muted: "text-sm text-muted-foreground",
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
