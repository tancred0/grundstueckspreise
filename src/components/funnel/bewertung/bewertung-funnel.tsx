"use client";

import Script from "next/script";
import {
	BewertungsFunnelProvider,
	useBewertungsFunnel,
} from "./bewertung-funnel-context";
import useFunnelProgress from "./bewertung-funnel-progress";
import { OnlyBack } from "./bewertung-navigation";
import PropertyTypeScreen from "./steps/0_property_type";
import PropertyTypeDetailsScreen from "./steps/1_property_type_details";
import PropertyHouseUnitsScreen from "./steps/10_property_house_units";
import PropertyLivingAreaScreen from "./steps/11_property_living_area";
import PlotAreaScreen from "./steps/12_property_plot_area";
import PropertyYearBuiltScreen from "./steps/51_property_year_built";
import PropertyConditionScreen from "./steps/52_property_condition";
import UserIsOwnerScreen from "./steps/70_user_is_owner";
import IntentionRequestReasonScreen from "./steps/71_intention_request_reason";
import AddressScreen from "./steps/72_adress";
import IntentionHorizonSellScreen from "./steps/80_intention_horizon_sell";
import IntentionHorizonBuyScreen from "./steps/81_intention_horizon_buy";
import LoaderScreen from "./steps/97_loader";
import UserInfoScreen from "./steps/98_user_info";
import SuccessScreen from "./steps/99_success";

const BewertungsFunnelRender = ({
	cityName,
	locationName,
}: {
	cityName?: string;
	locationName?: string;
}) => {
	const { data } = useBewertungsFunnel();
	const progress = useFunnelProgress();

	const renderStep = () => {
		switch (data.step) {
			case 0:
				return (
					<PropertyTypeScreen cityName={cityName} locationName={locationName} />
				);
			case 1:
				return <PropertyTypeDetailsScreen />;
			case 10:
				return <PropertyHouseUnitsScreen />;
			case 11:
				return <PropertyLivingAreaScreen />;
			case 12:
				return <PlotAreaScreen />;
			case 51:
				return <PropertyYearBuiltScreen />;
			case 52:
				return <PropertyConditionScreen />;
			case 70:
				return <UserIsOwnerScreen />;
			case 71:
				return <IntentionRequestReasonScreen />;
			case 80:
				return <IntentionHorizonSellScreen />;
			case 81:
				return <IntentionHorizonBuyScreen />;
			case 72:
				return <AddressScreen />;
			case 97:
				return <LoaderScreen />;
			case 98:
				return <UserInfoScreen />;
			case 99:
				return <SuccessScreen />;
			default:
				return (
					<>
						<h1>schlecht</h1>
						<OnlyBack />
					</>
				);
		}
	};

	return (
		<>
			{renderStep()}
			{/* <ProgressBar progress={progress} className="mb-8" /> */}
		</>
	);
};

export function BewertungsFunnel({
	cityName,
	locationName,
	className = "",
}: {
	cityName?: string;
	locationName?: string;
	className?: string;
}) {
	return (
		<div className={className} id="funnel">
			<Script
				async
				defer
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&libraries=places`}
			></Script>
			<BewertungsFunnelProvider>
				<BewertungsFunnelRender
					cityName={cityName}
					locationName={locationName}
				/>
			</BewertungsFunnelProvider>
		</div>
	);
}
