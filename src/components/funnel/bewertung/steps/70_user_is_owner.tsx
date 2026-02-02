import { SquareUser, User, Users } from "lucide-react";
import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import PersonStrikedIcon from "@/components/funnel/icons/personStriked";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import { OnlyBackNew } from "../bewertung-navigation";
import type { DataArrayItem } from "../bewertung-types";

export default function UserIsOwnerScreen() {
	const { setData, data, goToScreen } = useBewertungsFunnel();
	const analytics = useRudderStackAnalytics();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const heading = "Sind Sie der Eigentümer der Immobilie?";
	const nextScreen = 71;
	const multipleChoiceData: DataArrayItem[] = [
		{
			name: "Ja, ich bin Eigentümer.",
			icon: <User />,
			nextScreen: nextScreen,
			value: "yes",
		},
		{
			name: "Ich bin Teil-Eigentümer.",
			icon: <Users />,
			nextScreen: nextScreen,
			value: "part-owner",
		},
		{
			name: "Ich bin Angehöriger.",
			icon: <SquareUser />,
			nextScreen: nextScreen,
			value: "relative",
		},
		{
			name: "Nein, ich bin nicht Eigentümer.",
			icon: <PersonStrikedIcon height="32" width="32" />,
			nextScreen: nextScreen,
			value: "no",
		},
	];

	const handleSubmit = (item: DataArrayItem) => {
		// fire some event
		// ga.sendEvent('funnel', 'click', 'choose_address', item.name)

		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					user_is_owner: item.value,
				},
			};
		});

		analytics?.track("Funnel Owner Type Submitted", {
			...data.data,
			user_is_owner: item.value,
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
