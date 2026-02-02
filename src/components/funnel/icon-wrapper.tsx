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
		color: hover ? "#0f3b6b" : "#0f3b6b", // Change '#ff0000' to your hover color
		className: "h-12 w-12", // Always include these class names
	});
	return <>{Icon}</>;
}
