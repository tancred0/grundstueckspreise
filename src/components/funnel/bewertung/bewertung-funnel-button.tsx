import { ChevronRight } from "lucide-react";
import IconWrapper from "../icon-wrapper";
import type { DataArrayItem, DataArrayItemBool } from "./bewertung-types";

interface FunnelButtonProps {
	index: number;
	item: DataArrayItem | DataArrayItemBool;
	onclick: () => void;
}
const FunnelButton: React.FC<
	FunnelButtonProps & { variant?: "default" | "small" }
> = ({ index, item, onclick, variant = "default" }) => {
	const isSmall = variant === "small";
	return (
		<button
			className={`flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 ${isSmall ? "py-2" : "py-3"} transition-colors hover:bg-gray-50`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex items-center">
				<span className={`mr-5 ${isSmall ? "text-2xl" : "text-4xl"}`}>
					{item.icon}
				</span>
				<span className="text-left text-gray-700 text-sm xxs:text-base">
					{item.name}
				</span>
			</div>
			<ChevronRight className="text-gray-400" size={20} />
		</button>
	);
};

export const FunnelButtonNew: React.FC<
	FunnelButtonProps & { variant?: "default" | "small" }
> = ({ index, item, onclick, variant = "default" }) => {
	const isSmall = variant === "small";
	return (
		<button
			className={`flex h-16 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 ${isSmall ? "py-2" : "py-3"} mb-2 transition-colors hover:bg-gray-50`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex items-center text-blue-90">
				<span
					className={`mr-5 text-blue-90 ${item.name ? (isSmall ? "text-4xl" : "text-4xl") : "text-base"}`}
				>
					{item.icon}
				</span>
				{item.name && (
					<span className="text-left text-sm xxs:text-base">{item.name}</span>
				)}
			</div>
			<ChevronRight className="text-gray-400" size={20} />
		</button>
	);
};

export const FunnelButtonLarge: React.FC<
	FunnelButtonProps & {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		isHover: boolean;
	}
> = ({ index, item, onclick, onMouseEnter, onMouseLeave, isHover }) => {
	return (
		<button
			className={`flex-grow basis-0 rounded-md border-2 border-gray-600 bg-white p-4 transition-colors sm:p-6 ${
				isHover
					? "border-blue-90" //bg-blue-50
					: "border-neutral-200 bg-white"
			}`}
			key={index}
			onClick={() => onclick()}
			onMouseEnter={() => onMouseEnter()}
			onMouseLeave={() => onMouseLeave()}
		>
			<div className="flex h-full flex-col items-center justify-center text-blue-90">
				{item.name ? (
					<>
						<div className="text-4xl">
							<IconWrapper hover={isHover} icon={item.icon} />
						</div>
						<div className="mt-0 xs:mt-4 text-center md:h-10">{item.name}</div>
					</>
				) : (
					<div className="flex h-[104px] items-center justify-center">
						<div className="font-medium text-2xl">{item.icon}</div>
					</div>
				)}
			</div>
		</button>
	);
};

export const FunnelButtonRow: React.FC<
	FunnelButtonProps & { variant?: "default" | "small" }
> = ({ index, item, onclick, variant = "default" }) => {
	const isSmall = variant === "small";
	return (
		<button
			className={`flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 ${isSmall ? "py-2" : "py-3"} min-h-[120px] transition-colors hover:bg-gray-50`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex flex-col items-center">
				<span className={`mb-2 ${isSmall ? "text-2xl" : "text-4xl"}`}>
					{item.icon}
				</span>
				<span className="text-center text-gray-700 text-sm xxs:text-base">
					{item.name}
				</span>
			</div>
			{/* <ChevronRight className="text-gray-400" size={20} /> */}
		</button>
	);
};

export default FunnelButton;
