import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { CalendarTextIcon } from "@/components/funnel/icons/calendarText";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { OnlyBackNew } from "../bewertung-navigation";
import type { DataArrayItem } from "../bewertung-types";

export default function IntentionHorizonBuyScreen() {
	const { setData, goToScreen, data } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const heading = "Wann planen Sie zu kaufen?";
	const nextScreen = 72;
	const multipleChoiceData = [
		{
			name: <span className="hyphens-manual">Schnellst&shy;möglich</span>,
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
		//   name: "Unsicher",
		//   icon: <CalendarTextIcon text="..." x_start={8.5}/>,
		//   nextScreen: nextScreen,
		//   value: "Unsicher",
		// },
	];

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => ({
			...prevData,
			data: {
				...prevData.data,
				intention_horizon_buy: item.value,
			},
		}));

		analytics?.track("Funnel Buy Horizon Submitted", {
			...data.data,
			intention_horizon_buy: item.value,
		}, {
			campaign: {
				gclid: data.data.gclid,
				gbraid: data.data.gbraid,
				wbraid: data.data.wbraid,
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
		</>
	);
}
