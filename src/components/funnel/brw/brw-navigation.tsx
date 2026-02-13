import Image from "next/image";

import arrayLeftIcon from "@/images/funnel/arrayLeft.svg";
import arrayRightIcon from "@/images/funnel/arrayRight.svg";
import { cn } from "@/lib/utils";
import { useBRWFunnel } from "./brw-funnel-context";

interface BackAndForthProps {
	// autoSubmit?: boolean;
	nextScreen?: number;
	preSubmit?: () => void;
	disabled?: boolean;
}

interface OnlyForwardProps {
	nextScreen: number;
	className?: string;
	preSubmit?: () => void;
}

export function BackAndForth({
	nextScreen,
	preSubmit,
	disabled,
}: BackAndForthProps) {
	const { goToScreen, goBack } = useBRWFunnel();

	const handleClick = () => {
		if (!preSubmit || !nextScreen) return;
		preSubmit();
		goToScreen(nextScreen);
	};

	return (
		<div className="mt-4 grid grid-flow-col items-end gap-x-3">
			{nextScreen && (
				<button
					className={cn(
						"col-span-4 flex w-full justify-between rounded-lg p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-primary hover:brightness-90",
					)}
					disabled={disabled}
					onClick={handleClick}
				>
					<span className="text-white">Weiter</span>
					<Image alt="Weiter icon" className="brightness-0 invert" height={24} src={arrayRightIcon} width={24} />
				</button>
			)}
			{!nextScreen && (
				<button
					className={cn(
						"col-span-4 flex w-full justify-between rounded-lg p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-primary hover:brightness-90",
					)}
					disabled={disabled}
					type="submit"
				>
					<span className="text-white">Weiter</span>
					<Image alt="Weiter icon" className="brightness-0 invert" height={24} src={arrayRightIcon} width={24} />
				</button>
			)}
			<button
				className={cn(
					"order-first rounded-lg p-3 md:p-4 transition-colors",
					disabled ? "cursor-not-allowed bg-muted" : "bg-gray-200 hover:bg-gray-300",
				)}
				disabled={disabled}
				onClick={() => goBack()}
			>
				<Image alt="Map icon" height={24} src={arrayLeftIcon} width={0} />
			</button>
		</div>
	);
}
export function BackAndForthNew({
	nextScreen,
	preSubmit,
	disabled,
}: BackAndForthProps) {
	const { goToScreen, goBack } = useBRWFunnel();

	const handleClick = () => {
		if (!preSubmit || !nextScreen) return;
		preSubmit();
		goToScreen(nextScreen);
	};

	return (
		<div className="grid grid-cols-[1fr_3fr] items-end gap-2 sm:gap-4">
			{nextScreen && (
				<button
					className={cn(
						"flex w-full justify-between rounded-lg p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-primary hover:brightness-90",
					)}
					disabled={disabled}
					onClick={handleClick}
				>
					<span className="text-white">Weiter</span>
					<Image alt="Weiter icon" className="brightness-0 invert" height={24} src={arrayRightIcon} width={24} />
				</button>
			)}
			{!nextScreen && (
				<button
					className={cn(
						"flex w-full justify-between rounded-lg p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-primary hover:brightness-90",
					)}
					disabled={disabled}
					type="submit"
				>
					<span className="text-white">Weiter</span>
					<Image alt="Weiter icon" className="brightness-0 invert" height={24} src={arrayRightIcon} width={24} />
				</button>
			)}

			<button
				className={cn(
					"order-first rounded-lg p-3 md:p-4 transition-colors",
					disabled ? "cursor-not-allowed bg-muted" : "bg-gray-200 hover:bg-gray-300",
				)}
				disabled={disabled}
				onClick={() => goBack()}
			>
				<Image alt="Map icon" height={24} src={arrayLeftIcon} width={0} />
			</button>
		</div>
	);
}

export function OnlyBack() {
	const { goBack } = useBRWFunnel();
	return (
		<div className="flex justify-start">
			<button
				className="rounded-lg bg-gray-200 p-3 transition-colors hover:bg-gray-300 md:p-4"
				onClick={() => goBack()}
			>
				<Image alt="Map icon" height={24} src={arrayLeftIcon} width={0} />
			</button>
		</div>
	);
}

export function OnlyBackNew() {
	const { goBack } = useBRWFunnel();

	return (
		<div className="grid grid-cols-[1fr_3fr] items-end gap-2 sm:gap-4">
			<button
				className="rounded-lg bg-gray-200 p-3 transition-colors hover:bg-gray-300 md:p-4"
				onClick={() => goBack()}
			>
				<Image alt="Map icon" height={24} src={arrayLeftIcon} width={0} />
			</button>
			<div></div>
		</div>
	);
}

export function OnlyForward({
	nextScreen,
	preSubmit,
	className,
}: OnlyForwardProps) {
	const { goToScreen } = useBRWFunnel();

	const handleClick = () => {
		if (!preSubmit || !nextScreen) return;
		preSubmit();
		goToScreen(nextScreen);
	};

	return (
		<div className={cn("mb-4", className)}>
			<button
				className="flex w-full items-center justify-center rounded-lg bg-primary p-3 text-white md:p-4"
				onClick={handleClick}
			>
				<span className="mr-2 font-medium">Weiter</span>
				{/* <LuMoveRight size={24} /> */}
			</button>
		</div>
	);
}
