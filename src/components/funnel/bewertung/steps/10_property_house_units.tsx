import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StepsComponent from "../../steps-component";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { BackAndForthNew } from "../bewertung-navigation";

export default function PropertyHouseUnitsScreen() {
	const { data, setData, goToScreen } = useBewertungsFunnel();

	const minValue = 1;
	const maxValueSlider = 25;
	const defaultValue = 4;
	const nextScreen = 11;
	const heading = "Wieviele Einheiten hat das Gebäude?";
	const unitType = "Einheiten";
	const unitTypeSingular = "Einheit";

	const [flaeche, setFlaeche] = useState<number[]>([
		data.data.property_house_units ?? defaultValue,
	]);

	const handleSubmit = () => {
		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					property_house_units: flaeche[0],
				},
			};
		});

		goToScreen(nextScreen);
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
							<span className="font-bold text-4xl text-blue-90">
								{flaeche[0]!.toLocaleString("de-DE")}
							</span>
							<span className="text-blue-90 text-xl">{unitType}</span>
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
							<span>
								{minValue.toLocaleString("de-DE")} {unitTypeSingular}
							</span>
							<span>
								{maxValueSlider.toLocaleString("de-DE")} {unitType}
							</span>
						</div>
					</div>

					{/* Alternative input */}
					<div className="mb-8">
						<div className="flex items-center justify-center gap-4">
							<span className="text-neutral-700">Manuelle Eingabe:</span>
							<div className="flex items-center gap-2">
								<Input
									className="w-24 border-neutral-300 text-center focus:border-blue-500"
									max={1000}
									min={minValue}
									onChange={(e) => {
										const value =
											e.target.value === ""
												? 0
												: parseFloat(e.target.value) || 0;
										setFlaeche([value]);
									}}
									placeholder="425"
									type="number"
									value={flaeche[0] || ""}
								/>
								<span className="text-neutral-700">{unitType}</span>
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
