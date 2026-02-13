"use client";

import { BRWFunnelProvider, useBRWFunnel } from "./brw-funnel-context";
import AddressTypeScreen from "./steps/0_adress_type";
import AdressScreen from "./steps/1_adress";
import FlurScreen from "./steps/2_flur";
import RequestReasonScreen from "./steps/4_request_reason";
import FinalContacts from "./steps/98_user_info";
import SuccessScreen from "./steps/99_success";
import SellHorizonScreen from "./steps/30_sell_horizon";
import BuyHorizonScreen from "./steps/31_buy_horizon";
import UserIsOwnerScreen from "./steps/3_user_is_owner";
import PropertyAreaScreen from "./steps/5_property_area";
import WithRealEstateScreen from "./steps/6_with_real_estate";
import PropertyTypeScreen from "./steps/20_property_type";
import LivingAreaScreen from "./steps/21_living_area";
import YearBuiltScreen from "./steps/22_year_built";
import PropertyConditionScreen from "./steps/23_f_property_condition";
import GrundstuckPropertyDetailsScreen from "./steps/40_f_grundstueck_property_details";
import WantsAppraisalScreen from "./steps/81_wants_appraisal";
import LoaderScreen from "./steps/97_loader";
import BayernStopScreen from "./steps/f_110_bayern_stop";
import { OnlyBack } from "./brw-navigation";

import Script from "next/script";
import PropertyTypeDetailsScreen from "./steps/20.1_property_type_details";
import RequestReasonDetailScreen from "./steps/4.1_request_reason_details";
import AppraisalConfirmationScreen from "./steps/82_appraisal_confirmation";
import Mfh_Gh_UnitsScreen from "./steps/20.2_mfh_gh_units";

const BRWFunnelRender = ({ locationName, cityName, type = "brw" }: { locationName?: string, cityName?: string; type?: "brw" | "grundstuckspreis" }) => {
  const { data } = useBRWFunnel();

  const renderStep = () => {
    switch (data.step) {
      case 0:
        return <AddressTypeScreen locationName={locationName} type={type} />;
      case 1:
        return <AdressScreen />;
      case 2:
        return <FlurScreen />;
      case 3:
        return <UserIsOwnerScreen />;
      case 4:
        return <RequestReasonScreen />;
      case 401:
        return <RequestReasonDetailScreen />;

      // depending on request reason ("Immobilienverkauf" or "Immobilienkauf")
      case 30:
        return <SellHorizonScreen />;
      case 31:
        return <BuyHorizonScreen />;

      // continue normal funnel
      case 5:
        return <PropertyAreaScreen />;
      case 6:
        return <WithRealEstateScreen />;

      // for houses only
      case 20:
        return <PropertyTypeScreen />;
      case 201:
        return <PropertyTypeDetailsScreen />;
      case 202:
        return <Mfh_Gh_UnitsScreen />;
      case 21:
        return <LivingAreaScreen />;
      case 22:
        return <YearBuiltScreen />;
      case 23:
        return <PropertyConditionScreen />;

      // for type == "Grundstück"
      // final screen
      case 40:
        return <GrundstuckPropertyDetailsScreen />;

      // additional services
      case 81:
        return <WantsAppraisalScreen />;
      case 82:
        return <AppraisalConfirmationScreen />;

      // final form steps
      case 97:
        return <LoaderScreen type={type} />;
      case 98:
        return <FinalContacts type={type} />;
      case 99:
        return <SuccessScreen />;

      // stop for state = Bayern
      case 110:
        return <BayernStopScreen />;

      default:
        return (
          <>
            <h1>schlecht</h1>
            <OnlyBack />
          </>
        );
    }
  };

  // Step 0 has no white card, all other steps have one
  if (data.step === 0) {
    return (
      <div className="flex min-h-[674px] flex-col rounded-2xl bg-accent p-4 md:min-h-[670px] md:p-6">
        <div key={data.step} className="flex flex-1 flex-col animate-in fade-in duration-300">
          {renderStep()}
        </div>
      </div>
    );
  }

  // Step 98 (UserInfoScreen) needs a wider container for the form
  if (data.step === 98) {
    return (
      <div className="flex min-h-[674px] flex-col rounded-2xl bg-accent p-4 md:min-h-[670px] md:min-w-[720px] md:p-6">
        <div className="flex flex-1 flex-col rounded-xl bg-white p-4 md:rounded-2xl md:p-10">
          <div key={data.step} className="flex flex-1 flex-col animate-in fade-in duration-300">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[674px] flex-col rounded-2xl bg-accent p-4 md:h-[670px] md:p-6">
      <div className="flex flex-1 flex-col rounded-xl bg-white p-4 md:rounded-2xl md:p-10">
        <div key={data.step} className="flex flex-1 flex-col animate-in fade-in duration-300">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};


export function BRWFunnel({ cityName, locationName, type = "brw", className = "" }: { cityName?: string, locationName?: string, type?: "brw" | "grundstuckspreis", className?: string }) {
  return (
    <div className={className} id="funnel">
      <Script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&libraries=places`}
      ></Script>
      <BRWFunnelProvider>
        <BRWFunnelRender
          cityName={cityName}
          locationName={locationName}
        />
      </BRWFunnelProvider>
    </div>
  );
}