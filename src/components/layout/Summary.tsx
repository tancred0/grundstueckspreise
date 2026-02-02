import Image from "next/image";
import SandwichIcon from "@/images/summary/sandwich-menu.svg";
import { SummaryTextRender } from "@/server/cms/components";
import type { BlockContent } from "@/server/cms/typesLowLevel";

export default function Summary({ summary }: { summary: BlockContent }) {
	return (
		<div className="m-1 mb-6 rounded-2xl bg-blue-10 px-8 py-4" id="summary">
			<div className="mt-2 flex gap-x-2 md:pl-4">
				<Image alt="summary" height={24} src={SandwichIcon} width={24} />
				<h3 className="text-blue-90">Zusammenfassung</h3>
			</div>
			<SummaryTextRender input={summary} />
		</div>
	);
}
