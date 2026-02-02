import Image from "next/image";
import infoIcon from "@/images/sources/info.svg";
import { PortableTextRenderer } from "@/server/cms/components";
import type { BlockContent } from "@/server/cms/typesLowLevel";

export default function Sources({ sources }: { sources: BlockContent }) {
	return (
		<div
			className="mt-12 rounded-2xl border-2 border-neutral-200 p-6"
			id="sources"
		>
			<div className="mb-6 inline-flex gap-2 rounded-full border-2 border-blue-90 bg-blue-10 px-4 py-2">
				<Image
					alt="Infoicon"
					className="pt-[2px]"
					height={24}
					src={infoIcon}
					width={24}
				/>
				<div className="font-semibold text-xl">Quellen</div>
			</div>
			<PortableTextRenderer input={sources} />
		</div>
	);
}
