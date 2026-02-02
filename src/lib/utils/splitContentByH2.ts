import type {
	AddSection,
	Block,
	BlockContent,
} from "@/server/cms/typesLowLevel";

export default function splitContentByH2(blocks: BlockContent): AddSection[] {
	const result: AddSection[] = [];
	let currentSection: AddSection = { heading: "", text: [] as BlockContent };

	for (const block of blocks) {
		if (block.style === "h2") {
			// If the current section has text, add it to the result
			if (currentSection.text.length > 0) {
				result.push(currentSection);
			}

			// Start a new section with the new heading
			currentSection = {
				heading: block.children?.[0]?.text || "Fehlende h2",
				text: [] as BlockContent,
			};
		} else {
			currentSection.text.push(block);
		}
	}

	// Push the last collected section if it has content
	if (currentSection.text.length > 0) {
		result.push(currentSection);
	}

	return result;
}
