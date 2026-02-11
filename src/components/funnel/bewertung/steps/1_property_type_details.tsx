import {
	Briefcase,
	Building,
	Building2,
	HelpCircle,
	Home,
	Sprout,
	TreePine,
	Warehouse,
} from "lucide-react";
import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { OnlyBackNew } from "../bewertung-navigation";
import type { DataArrayItem } from "../bewertung-types";

export default function PropertyTypeDetailsScreen() {
	const { setData, goToScreen, data } = useBewertungsFunnel();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const analytics = useRudderStackAnalytics();

	let nextScreen = 11;
	let heading = "";
	let multipleChoiceData: DataArrayItem[] = [];

	switch (data.data.property_type) {
		case "Wohnung":
			heading = "Bitte wählen Sie die Art Ihrer Wohnung?";
			// nextScreen = 11;
			multipleChoiceData = [
				{
					name: "Erdgeschoss",
					icon: <Building />,
					nextScreen: nextScreen,
					value: "Erdgeschoss",
				},
				{
					name: "Etagenwohnung",
					icon: <Building />,
					nextScreen: nextScreen,
					value: "Etagenwohnung",
				},
				{
					name: "Penthouse/Dachgeschoss",
					icon: <Building />,
					nextScreen: nextScreen,
					value: "Penthouse/Dachgeschoss",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
		case "Grundstück":
			heading = "Um was für einen Grundstücktyp handelt es sich?";
			nextScreen = 12;
			multipleChoiceData = [
				{
					name: "Bauland",
					icon: <Home />,
					nextScreen: nextScreen,
					value: "Bauland",
				},
				{
					name: "Ackerland",
					icon: <Sprout />,
					nextScreen: nextScreen,
					value: "Ackerland",
				},
				{
					name: "Wald-/ Grünland",
					icon: <TreePine />,
					nextScreen: nextScreen,
					value: "Wald-/Grünland",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
		case "Gewerbe":
			heading = "Bitte wählen Sie die Art Ihres Hauses?";
			multipleChoiceData = [
				{
					name: "Wohn- und Geschäftshaus",
					icon: <Briefcase />,
					nextScreen: 10,
					value: "Wohn- und Geschäftshaus",
				},
				{
					// Bürogebäude
					name: "Bürogebäude",
					icon: <Building />,
					nextScreen: 10,
					value: "Bürogebäude",
				},
				{
					name: "Logistik-/ Industriegebäude",
					icon: <Warehouse />,
					nextScreen: nextScreen,
					value: "Logistik-/ Industriegebäude",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
		default:
			// case "Haus":
			heading = "Bitte wählen Sie die Art Ihres Hauses?";
			multipleChoiceData = [
				{
					name: "Einfamilienhaus",
					icon: <Home />,
					nextScreen: nextScreen,
					value: "Einfamilienhaus",
				},
				{
					name: "Mehrfamilienhaus",
					icon: <Building2 />,
					nextScreen: 10,
					value: "Mehrfamilienhaus",
				},
				{
					name: "Wohn- & Geschäftshaus",
					icon: <Briefcase />,
					nextScreen: 10,
					value: "Wohn- und Geschäftshaus",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
	}

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => {
			const updatedData = {
				...prevData.data,
				property_type_details: item.value,
			};

			analytics?.track("Funnel Property Type Detail Submitted", updatedData, {
				campaign: {
					gclid: data.data.gclid,
					gbraid: data.data.gbraid,
					wbraid: data.data.wbraid,
				},
			});

			return {
				...prevData,
				data: updatedData,
			};
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
