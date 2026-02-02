import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";

import { CalendarTextIcon } from "@/components/funnel/icons/calendarText";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { OnlyBackNew } from "../bewertung-navigation";
import type { DataArrayItem } from "../bewertung-types";

export default function IntentionHorizonSellScreen() {
	const { setData, goToScreen, data } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const heading = "Wann planen Sie zu verkaufen?";
	const nextScreen = 72;
	const multipleChoiceData = [
		{
			name: "Schnellstmöglich",
			icon: <CalendarTextIcon text="!!!" x_start={8.75} />,
			nextScreen: nextScreen,
			value: "1-3 Monate",
		},
		{
			name: "In den nächsten 6 Monaten",
			icon: <CalendarTextIcon text="<6" x_start={8} />,
			nextScreen: nextScreen,
			value: "4-6 Monate",
		},
		{
			name: "In den nächsten 2 Jahren",
			icon: <CalendarTextIcon text="6-24" x_start={4.25} />,
			nextScreen: nextScreen,
			value: "6-12 Monate",
		},
		{
			name: "Unsicher",
			icon: <CalendarTextIcon text="..." x_start={8.5} />,
			nextScreen: nextScreen,
			value: "Unsicher",
		},
		// {
		//   name: "Ich will nicht verkaufen.",
		//   icon: <CalendarTextIcon text="?" x_start={10.5} />,
		//   nextScreen: nextScreen,
		//   value: "Ich will nicht verkaufen",
		// },
	];

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => ({
			...prevData,
			data: {
				...prevData.data,
				intention_horizon_sell: item.value,
			},
		}));

		analytics?.track("Funnel Sell Horizon Submitted", {
			...data.data,
			intention_horizon_sell: item.value,
		});

		goToScreen(item.nextScreen);
	};

	return (
		<div className="h-[674px] rounded-lg bg-blue-10 p-4 md:h-[670px] md:rounded-2xl">
			<div className="flex h-full flex-col rounded-lg bg-white p-4 md:rounded-2xl md:p-12">
				<div className="mb-4 space-y-6 md:mb-12">
					<StepsComponent currentStep={1} />
					<div className="funnel-h2">{heading}</div>
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

				<div className="hidden grid-cols-2 gap-4 md:grid">
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
			</div>
		</div>
	);
}
