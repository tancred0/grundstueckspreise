"use client";

interface StepsComponentProps {
	currentStep: number;
	size?: "base" | "small";
}

function StepNumber({
	number,
	active,
	size = "base",
}: {
	number: number;
	active: boolean;
	size: "base" | "small";
}) {
	return (
		<div
			className={`flex flex-shrink-0 items-center justify-center rounded-full text-lg ${size === "base" ? "h-10 w-10" : "h-8 w-8"} ${
				active
					? "bg-primary text-primary-foreground"
					: "border border-primary bg-white text-primary"
			}`}
		>
			{number}
		</div>
	);
}

const Separator = () => {
	return <div className="h-[1px] w-6 bg-primary" />;
};

const StepLabel = (text: string) => {
	return <div className="text-base text-primary">{text}</div>;
};

const SeperatorText = ({
	text,
	isActive,
}: {
	text: string;
	isActive: boolean;
}) => {
	return (
		<>
			{/* Show only Separator on mobile, otherwise show label if active, separator if not */}
			<span className="block sm:hidden">
				<Separator />
			</span>
			<span className="hidden sm:block">
				{!isActive && <Separator />}
				{isActive && StepLabel(text)}
			</span>
		</>
	);
};

const StepsComponent = ({
	currentStep,
	size = "base",
}: StepsComponentProps) => {
	return (
		<div className="mx-auto">
			<div className="flex items-center justify-center gap-4">
				<StepNumber active={currentStep >= 1} number={1} size={size} />
				<SeperatorText isActive={currentStep == 1} text="Datenerfassung" />
				<StepNumber active={currentStep >= 2} number={2} size={size} />
				<SeperatorText
					isActive={currentStep == 2}
					text="Angaben für Zustellung"
				/>
				<StepNumber active={false} number={3} size={size} />
			</div>
		</div>
	);
};

export default StepsComponent;
