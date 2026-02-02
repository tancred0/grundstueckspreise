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
			className={`flex h-16 w-full items-center justify-between rounded-lg border border-border bg-white px-4 ${isSmall ? "py-2" : "py-3"} mb-2 transition-colors hover:bg-accent hover:border-primary`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex items-center text-primary">
				<span
					className={`mr-5 text-primary ${item.name ? (isSmall ? "text-4xl" : "text-4xl") : "text-base"}`}
				>
					{item.icon}
				</span>
				{item.name && (
					<span className="text-left text-sm xxs:text-base">{item.name}</span>
				)}
			</div>
			<ChevronRight className="text-muted-foreground" size={20} />
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
			className={`flex-grow basis-0 rounded-xl bg-white p-6 transition-all duration-200 sm:p-8 ${
				isHover
					? "border-2 border-primary shadow-lg"
					: "border border-gray-200 shadow-sm hover:shadow-md"
			}`}
			key={index}
			onClick={() => onclick()}
			onMouseEnter={() => onMouseEnter()}
			onMouseLeave={() => onMouseLeave()}
		>
			<div className="flex h-full flex-col items-center justify-center text-primary">
				{item.name ? (
					<>
						<div className="mb-3 text-primary">
							<IconWrapper hover={isHover} icon={item.icon} />
						</div>
						<div className="text-center font-medium text-primary">{item.name}</div>
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
