import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StepsComponent from "../../steps-component";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { BackAndForthNew } from "../bewertung-navigation";

export default function PlotAreaScreen() {
	const { data, setData } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const nextScreen = data.data.property_type === "Grundstück" ? 70 : 51;

	const defaultMaxValue = 5000;
	const [maxValueSlider, setMaxValueSlider] = useState(defaultMaxValue);

	const heading = "Wie groß ist die Grundstücksfläche?";
	const minValue = 50;
	const defaultValue = 425;

	const unitType = "m²";
	const unitTypeSingular = unitType;

	const [flaeche, setFlaeche] = useState<number[]>([
		data.data.property_plot_area || defaultValue,
	]);

	const handleSubmit = () => {
		// const bestBrw = data.data.int_brw_value ?? data.data.int_zip_code_brw;
		// const valuation = bestBrw != null ? Math.round(bestBrw * (flaeche[0] ?? 425) * 100) / 100 : 200_000;

		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					property_plot_area: flaeche[0],
				},
			};
		});

		analytics?.track("Funnel Plot Area Submitted", {
			...data.data,
			property_plot_area: flaeche[0],
		});

		// goToScreen(6);
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
								// Adjust slider max if value exceeds current max
								if (value[0]! > maxValueSlider) {
									setMaxValueSlider(
										Math.max(Math.ceil(value[0]! / 1000) * 1000, 10000),
									);
								}
								// Reset max to default if value becomes smaller than default
								else if (
									value[0]! < defaultMaxValue &&
									maxValueSlider > defaultMaxValue
								) {
									setMaxValueSlider(defaultMaxValue);
								}
							}}
							step={5}
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
									max={100000}
									min={minValue}
									onChange={(e) => {
										const value =
											e.target.value === ""
												? 0
												: parseFloat(e.target.value) || 0;
										setFlaeche([value]);
										// Adjust slider max if value exceeds current max
										if (value > maxValueSlider) {
											setMaxValueSlider(
												Math.max(Math.ceil(value / 1000) * 1000 + 1000, 10000),
											);
										}
										// Reset max to default if value becomes smaller than default
										else if (
											value < defaultMaxValue &&
											maxValueSlider > defaultMaxValue
										) {
											setMaxValueSlider(defaultMaxValue);
										}
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
