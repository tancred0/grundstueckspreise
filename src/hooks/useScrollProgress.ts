"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			setScrollProgress(progress);
			setScrollPosition(scrollTop);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return { scrollProgress, scrollPosition };
}

export default useScrollProgress;
