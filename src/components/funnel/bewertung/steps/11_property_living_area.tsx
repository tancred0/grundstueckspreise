import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StepsComponent from "../../steps-component";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { BackAndForthNew } from "../bewertung-navigation";

export default function PropertyLivingAreaScreen() {
	const { data, setData } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const [maxValueSlider, setMaxValueSlider] = useState(800);
	const item = "Wohnfläche";
	const minValue = 35;
	const defaultValue = 125;
	const unitType = "m²";

	const [flaeche, setFlaeche] = useState<number[]>([
		data.data.property_living_area || defaultValue,
	]);

	const handleSubmit = () => {
		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					property_living_area: flaeche[0],
				},
			};
		});

		// analytics?.track("Funnel Property Living Area Submitted", {
		//   ...data.data,
		//   property_living_area: flaeche[0],
		// });

		// goToScreen(22);
	};

	const heading = "Wie groß ist die Wohnfläche?";
	const nextScreen = data.data.property_type === "Wohnung" ? 51 : 12;
	const defaultMaxValue = 800;
	const unitTypeSingular = unitType;

	return (
		<>
			<div className="mb-4 space-y-4 md:mb-10">
				<StepsComponent currentStep={1} />
				<h2 className="text-center text-xl font-semibold text-primary md:text-2xl">{heading}</h2>
			</div>
			<div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
				{/* Large centered value display */}
				<div className="mb-8 text-center">
					<div className="inline-flex items-baseline gap-2 rounded-lg bg-accent px-6 py-3">
						<span className="font-bold text-4xl text-primary">
							{flaeche[0]!.toLocaleString("de-DE")}
						</span>
						<span className="text-primary text-xl">{unitType}</span>
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
					<div className="flex justify-between text-muted-foreground text-sm">
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
						<span className="text-muted-foreground">Manuelle Eingabe:</span>
						<div className="flex items-center gap-2">
							<Input
								className="w-24 border-border text-center focus:border-primary"
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
							<span className="text-muted-foreground">{unitType}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-auto">
				<BackAndForthNew nextScreen={nextScreen} preSubmit={handleSubmit} />
			</div>
		</>
	);
}
