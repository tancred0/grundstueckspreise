"use client";

import type { JSX } from "react";
import { Typography } from "@/components/ui/typography";

export default function HeroNew({ h1 }: { h1: string | JSX.Element }) {
	return (
		<div className="flex flex-col items-start">
			<Typography variant="h1">{h1}</Typography>
		</div>
	);
}
