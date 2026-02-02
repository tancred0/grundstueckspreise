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
			fill="currentColor"
			height="1em"
			stroke="currentColor"
			strokeWidth="0"
			viewBox="0 0 24 24"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g id="Calendar_Date">
				<path
					d="M18.435,4.955h-1.94v-1.41c0-0.26-0.23-0.51-0.5-0.5c-0.27,0.01-0.5,0.22-0.5,0.5v1.41h-7v-1.41
            c0-0.26-0.23-0.51-0.5-0.5c-0.27,0.01-0.5,0.22-0.5,0.5v1.41h-1.93c-1.38,0-2.5,1.12-2.5,2.5v11c0,1.38,1.12,2.5,2.5,2.5h12.87
            c1.38,0,2.5-1.12,2.5-2.5v-11C20.935,6.075,19.815,4.955,18.435,4.955z M19.935,18.455c0,0.83-0.67,1.5-1.5,1.5H5.565
            c-0.83,0-1.5-0.67-1.5-1.5v-8.42h15.87V18.455z M19.935,9.035H4.065v-1.58c0-0.83,0.67-1.5,1.5-1.5h1.93v0.59
            c0,0.26,0.23,0.51,0.5,0.5c0.27-0.01,0.5-0.22,0.5-0.5v-0.59h7v0.59c0,0.26,0.23,0.51,0.5,0.5c0.27-0.01,0.5-0.22,0.5-0.5v-0.59
            h1.94c0.83,0,1.5,0.67,1.5,1.5V9.035z"
				></path>
				<text
					fill="currentColor"
					fontFamily="system-ui"
					fontSize="6"
					fontWeight="600"
					x={x_start}
					y="17"
				>
					{text}
				</text>
			</g>
		</svg>
	);
};
