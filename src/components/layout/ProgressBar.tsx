"use client";

import type React from "react";
import useScrollProgress from "@/hooks/useScrollProgressPct";

const ProgressBar: React.FC = () => {
	const scrollProgress = useScrollProgress();
	return (
		// Progress bar between header and breadcrumb
		// <div className="sticky w-full z-50 top-[47px] md:top-[59px] h-1 bg-neutral-200">
		<div className="sticky top-[80px] z-50 -mt-6 mb-6 h-1 w-full bg-neutral-200 md:top-[140px] md:-mt-10 md:mb-10">
			<div
				className="h-full bg-primary/50 transition-width duration-250 ease-out"
				style={{ width: `${scrollProgress}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
