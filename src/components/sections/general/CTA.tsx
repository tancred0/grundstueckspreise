import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
	cta: string;
	pageLink: string;
}

export default function CTA({ cta, pageLink }: CTAProps) {
	return (
		<div className="my-6">
			<Button asChild>
				<Link href={pageLink}>{cta}</Link>
			</Button>
		</div>
	);
}

interface CTANavBarProps {
	cta: string;
	href: string;
	className?: string;
}

export function CTANavBar({ cta, href, className }: CTANavBarProps) {
	return (
		<Button asChild className={cn("whitespace-nowrap", className)} size="sm">
			<Link href={href}>{cta}</Link>
		</Button>
	);
}
