"use client";

import { cn } from "@/lib/utils";

const ProgressBar = ({
	progress,
	className,
}: {
	progress: number;
	className?: string;
}) => {
	return (
		<div className={cn("z-50 h-1 w-full bg-[#f6f7f9]", className)}>
			<div
				className="h-full bg-primary/50 transition-all duration-500 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
