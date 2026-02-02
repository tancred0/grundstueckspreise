import type { JSX } from "react";
import React from "react";

export default function IconWrapper({
	icon,
	hover,
}: {
	icon: JSX.Element;
	hover: boolean;
}) {
	const Icon = React.cloneElement(icon, {
		color: "#0F3B6B", // Primary color
		className: "h-10 w-10 md:h-12 md:w-12",
		strokeWidth: 1.5,
	});
	return <>{Icon}</>;
}
