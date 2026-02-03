import type React from "react";

interface CalendarTextIconProps extends React.SVGProps<SVGSVGElement> {
	x_start?: number;
	text?: string;
}

export const CalendarTextIcon: React.FC<CalendarTextIconProps> = ({
	text = "1-3",
	x_start = 7,
	...props
}) => {
	return (
		<svg
			fill="none"
			height="1em"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			{/* Calendar outline */}
			<rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
			{/* Top line */}
			<line x1="3" y1="10" x2="21" y2="10" />
			{/* Calendar pins */}
			<line x1="8" y1="2" x2="8" y2="6" />
			<line x1="16" y1="2" x2="16" y2="6" />
			{/* Text */}
			<text
				fill="currentColor"
				fontFamily="system-ui"
				fontSize="6"
				fontWeight="600"
				stroke="none"
				x={x_start}
				y="17"
			>
				{text}
			</text>
		</svg>
	);
};
