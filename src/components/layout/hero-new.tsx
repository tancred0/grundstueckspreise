"use client";

import type { JSX } from "react";

export default function HeroNew({ h1 }: { h1: string | JSX.Element }) {
	return (
		<div className="flex flex-col items-start">
			<h1 className="md:hyphens-none">{h1}</h1>
		</div>
	);
}
