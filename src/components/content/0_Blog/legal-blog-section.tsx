/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextRenderer } from "@/server/cms/components";

interface LegalBlogSectionProps {
	data: any;
}

export default function LegalBlogSection({ data }: LegalBlogSectionProps) {
	return (
		<section className="prose prose-slate max-w-none">
			{data.title && <h1>{data.title}</h1>}
			{data.body && <PortableTextRenderer input={data.body} />}
		</section>
	);
}
