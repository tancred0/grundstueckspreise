// Import your icons
import { Hammer, Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { OnlyBackNew } from "../bewertung-navigation";
import type { DataArrayItem } from "../bewertung-types";

export default function PropertyConditionScreen() {
	const { data, setData, goToScreen } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const nextScreen = 70;
	const heading = "Wie bewerten Sie den Zustand Ihrer Immobilie?";
	// const nextScreen = 24
	const multipleChoiceData = [
		{
			name: "Renovierungsbedürftig",
			icon: <Hammer />,
			nextScreen: nextScreen,
			value: "Renovierungsbedürftig",
		},
		{
			name: "Guter Zustand",
			icon: <Heart />,
			nextScreen: nextScreen,
			value: "Gut erhalten",
		},
		{
			name: "Neu",
			icon: <Star />,
			nextScreen: nextScreen,
			value: "Neuwertig",
		},
	];

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => ({
			...prevData,
			data: {
				...prevData.data,
				property_condition: item.value,
			},
		}));

		analytics?.track("Funnel Property Condition Submitted", {
			...data.data,
			property_condition: item.value,
		});

		goToScreen(item.nextScreen);
	};

	return (
		<>
			<div className="mb-6 space-y-4 md:mb-10">
				<StepsComponent currentStep={1} />
				<h2 className="text-center text-xl font-semibold text-primary md:text-2xl">{heading}</h2>
			</div>

			<div className="md:hidden">
				{multipleChoiceData.map((item, index) => (
					<FunnelButtonNew
						index={index}
						item={item}
						key={index}
						onclick={() => handleSubmit(item)}
						variant="small"
					/>
				))}
			</div>

			<div className="hidden grid-cols-3 gap-4 md:grid">
				{multipleChoiceData.map((item, index) => (
					<FunnelButtonLarge
						index={index}
						isHover={hoverIndex === index}
						item={item}
						key={index}
						onclick={() => handleSubmit(item)}
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
					/>
				))}
			</div>
			<div className="mt-auto pt-6">
				<OnlyBackNew />
			</div>
		</>
	);
}
