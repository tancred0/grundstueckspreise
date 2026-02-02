"use client";

import { useState } from "react";

export function useObserver() {
	const [highlightedSection, setHighlightedSection] = useState<string | null>(
		null,
	);

	return {
		highlightedSection,
		setHighlightedSection,
	};
}

export default useObserver;
