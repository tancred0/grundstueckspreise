import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StepsComponent from "../../steps-component";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { BackAndForthNew } from "../bewertung-navigation";

export default function YearBuiltScreen() {
	const { data, setData, goToScreen } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();

	const heading = "In welchem Jahr wurde die Immobilie gebaut?";
	const nextScreen = 52;

	const minValue = 1850;
	const maxValueSlider = 2026;
	const defaultValue = 1985;

	const [flaeche, setFlaeche] = useState<number[]>([
		data.data.property_year_built ?? defaultValue,
	]);

	const handleValueChange = (value: number) => {
		// Enforce min/max constraints
		const clampedValue = Math.min(Math.max(value, minValue), maxValueSlider);
		setFlaeche([clampedValue]);
	};

	const handleSubmit = () => {
		// Ensure value is within bounds before submitting
		const clampedValue = Math.min(
			Math.max(flaeche[0]!, minValue),
			maxValueSlider,
		);

		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					property_year_built: clampedValue,
				},
			};
		});

		analytics?.track("Funnel Property Year Built Submitted", {
			...data.data,
			property_year_built: clampedValue,
		});

		// goToScreen(91);
	};

	return (
		<div className="h-[674px] rounded-lg bg-blue-10 p-4 md:h-[670px] md:rounded-2xl">
			<div className="flex h-full flex-col rounded-lg bg-white p-4 md:rounded-2xl md:p-12">
				<div className="mb-4 space-y-6 md:mb-12">
					<StepsComponent currentStep={1} />
					<div className="funnel-h2">{heading}</div>
				</div>
				<div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
					{/* Large centered value display */}
					<div className="mb-8 text-center">
						<div className="inline-flex items-baseline gap-2 rounded-lg bg-blue-10 px-6 py-3">
							<span className="text-blue-90 text-xl">Jahr:</span>
							<span className="font-bold text-4xl text-blue-90">
								{flaeche[0]!}
							</span>
						</div>
					</div>

					{/* Slider */}
					<div className="mb-8 w-full">
						<Slider
							className="mb-4"
							max={maxValueSlider}
							min={minValue}
							onValueChange={(value) => {
								setFlaeche(value);
							}}
							step={1}
							value={flaeche}
						/>
						<div className="flex justify-between text-neutral-600 text-sm">
							<span>{minValue}</span>
							<span>{maxValueSlider}</span>
						</div>
					</div>

					{/* Alternative input */}
					<div className="mb-8">
						<div className="flex items-center justify-center gap-4">
							<span className="text-neutral-700">Manuelle Eingabe:</span>
							<div className="flex items-center gap-2">
								<Input
									className="w-24 border-neutral-300 text-center focus:border-blue-500"
									max={maxValueSlider}
									min={minValue}
									onBlur={(e) => {
										// Enforce constraints when user leaves the field
										const value =
											e.target.value === ""
												? defaultValue
												: parseFloat(e.target.value) || defaultValue;
										handleValueChange(value);
									}}
									onChange={(e) => {
										const value =
											e.target.value === ""
												? 0
												: parseFloat(e.target.value) || 0;
										setFlaeche([value]);
									}}
									placeholder="1985"
									type="number"
									value={flaeche[0] || ""}
								/>
								<span className="text-neutral-700"></span>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-auto">
					<BackAndForthNew nextScreen={nextScreen} preSubmit={handleSubmit} />
				</div>
			</div>
		</div>
	);
}
