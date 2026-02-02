"use client";
import { PortableTextRenderer } from "@/server/cms/components";
import type { BlockContent } from "@/server/cms/typesLowLevel";

export default function Hero({
	locationName,
	h1,
	introText,
}: {
	locationName: string;
	h1?: string;
	introText?: string | BlockContent;
}) {
	return (
		<div className="flex flex-col items-start">
			<h1>
				{h1 === undefined
					? `Bodenrichtwerte & Grundstückspreise ${locationName} 2026`
					: h1}
			</h1>
			{introText !== undefined && (
				<div className={typeof introText === "string" ? "h4" : ""}>
					{typeof introText === "string" ? (
						introText
					) : (
						<PortableTextRenderer input={introText} />
					)}
				</div>
			)}
		</div>
	);
}
