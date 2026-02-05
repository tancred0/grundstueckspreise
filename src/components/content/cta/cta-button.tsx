import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTAProps {
	ctaText: string;
	pageLink: string;
}

export default function CTA({ ctaText, pageLink }: CTAProps) {
	return (
		<div className="my-2 lg:my-6">
			<Button asChild size={"lg"} className="w-full">
				<Link href={pageLink}>{ctaText}</Link>
			</Button>
		</div>
	);
}
