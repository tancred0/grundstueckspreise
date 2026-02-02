import Link from "next/link";
import { Button } from "@/components/ui/button";

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
