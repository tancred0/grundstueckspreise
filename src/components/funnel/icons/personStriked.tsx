import type React from "react";

const PersonStrikedIcon: React.FC<
	React.SVGProps<SVGSVGElement> & {
		color?: string;
		width?: string;
		height?: string;
	}
> = ({ color = "currentColor", width = "48", height = "48", ...props }) => {
	return (
		<svg
			fill={color}
			height={height}
			stroke={color}
			viewBox="0 0 24 24"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
			<path d="M2 2L22 22M22 2L2 22" strokeWidth="3" />
		</svg>
	);
};

export default PersonStrikedIcon;
