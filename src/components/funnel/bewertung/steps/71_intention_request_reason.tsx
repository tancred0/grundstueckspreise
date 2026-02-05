/// DIFFERENT STYLING BC OF 6 BUTTONS

import {
	Building2,
	ClipboardList,
	Gift,
	HelpCircle,
	KeyRound,
	Tags,
} from "lucide-react";
import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { sendGAEvent } from "@/components/utils/analytics";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { OnlyBackNew } from "../bewertung-navigation";
import type { DataArrayItem } from "../bewertung-types";

export default function IntentionRequestReasonScreen() {
	const { setData, data, goToScreen } = useBewertungsFunnel();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const analytics = useRudderStackAnalytics();
	const heading = "Für welchen Zweck wird die Bewertung benötigt?";
	const nextScreen = 72;
	const multipleChoiceData = [
		{
			name: <>Verkauf</>,
			description: "(Markt-/Verkehrswert)",
			icon: <Tags />,
			nextScreen: 80,
			value: "Immobilienverkauf",
		},
		{
			name: <>Kauf</>,
			description: "(Marktwert)",
			icon: <KeyRound />,
			nextScreen: 81,
			value: "Immobilienkauf",
		},
		{
			name: <>Finanzamt</>,
			description: "(Verkehrs-/Grundsteuerwert)",
			icon: <ClipboardList />,
			nextScreen: nextScreen,
			value: "Finanzamt",
		},
		{
			name: <>Erbe oder Schenkung</>,
			description: "(Verkehrswert)",
			icon: <Gift />,
			nextScreen: nextScreen,
			value: "Erbe oder Schenkung",
		},
		{
			name: <>Vermögensaufstellung</>,
			description: "(Markt-/Verkehrswert)",
			icon: <Building2 />,
			nextScreen: nextScreen,
			value: "Vermögensaufstellung",
		},
		{
			name: <>Anderer Hintergrund</>,
			icon: <HelpCircle />,
			nextScreen: nextScreen,
			value: "Anderer Zweck",
		},
	];

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => ({
			...prevData,
			data: {
				...prevData.data,
				intention_request_reason: item.value,
			},
		}));

		analytics?.track("Funnel Request Reason Submitted", {
			...data.data,
			intention_request_reason: item.value,
		});

		sendGAEvent({
			action: "BRW | Funnel Request Reason Submitted",
			data: {
				...data.data,
				intention_request_reason: item.value,
			},
		});

		goToScreen(item.nextScreen);
	};

	return (
		<>
			<div className="mb-4 space-y-4 md:mb-10">
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
			<div className="mt-auto">
				<OnlyBackNew />
			</div>
		</>
	);
}
