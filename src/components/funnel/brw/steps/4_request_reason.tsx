import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "@/components/funnel/brw/brw-types";

import { useState } from "react";

import { HelpCircle, TrendingUp, TrendingDown, ClipboardList, Gift, Building2, Tags, Search, Tag, Key, KeySquare, KeyRound } from "lucide-react";



import { OnlyBack, OnlyBackNew } from "../brw-navigation";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { sendGAEvent } from "@/components/utils/analytics";
import FunnelButton,  { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import StepsComponent from "../../steps-component";

export default function RequestReasonScreen() {
  const { setData, data, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const analytics = useRudderStackAnalytics();

  const multipleChoiceData = [
    {
      name: <>Verkauf</>,
      // description: "(Markt-/Verkehrswert)",
      icon: <Tags />,
      nextScreen: 30,
      value: "Immobilienverkauf",
    },
    {
      name: <>Kauf</>,
      // description: "(Marktwert)",
      icon: <KeyRound />,
      nextScreen: data.data.property_state === "Bayern" ? 110 : 31,
      value: "Immobilienkauf",
    },
    {
      name: <>Finanzamt / Grundsteuer</>,
      // description: "(Verkehrs-/Grundsteuerwert)",
      icon: <ClipboardList />,
      nextScreen: data.data.property_state === "Bayern" ? 110 : 5,
      value: "Finanzamt",
    },
    {
      name: <>Erbe oder Schenkung</>,
      // description: "(Verkehrswert)",
      icon: <Gift />,
      nextScreen: data.data.property_state === "Bayern" ? 110 : 5,
      value: "Erbe oder Schenkung",
    },
    {
      name: <>Vermögensaufstellung</>,
      // description: "(Markt-/Verkehrswert)",
      icon: <Building2 />,
      nextScreen: data.data.property_state === "Bayern" ? 110 : 5,
      value: "Vermögensaufstellung",
    },
    {
      name: <>Anderer Hintergrund (Scheidung)</>,
      icon: <HelpCircle />,
      nextScreen: data.data.property_state === "Bayern" ? 110 : 401,
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
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });

    // sendGAEvent({
    //   action: "BRW | Funnel Request Reason Submitted",
    //   data: {
    //     ...data.data,
    //     intention_request_reason: item.value,
    //   },
    // });

    goToScreen(item.nextScreen);
  };

  const heading = "Für welchen Zweck wird die Bewertung benötigt?";

  return (
    <>
      <div className="space-y-6 mb-4 md:mb-12">
        <StepsComponent currentStep={1} />
        <div className="text-xl font-semibold text-primary md:text-2xl text-center">
          {heading}
        </div>
      </div>

      <div className="md:hidden">
        {multipleChoiceData.map((item, index) => (
          <FunnelButtonNew
            key={index}
            item={item}
            index={index}
            onclick={() => handleSubmit(item)}
            variant="small"
          />
        ))}
      </div>


      <div className="hidden md:grid grid-cols-3 gap-4">
        {multipleChoiceData.map((item, index) => (
          <FunnelButtonLarge
            key={index}
            item={item}
            index={index}
            onclick={() => handleSubmit(item)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            isHover={hoverIndex === index}
          />
        ))}
      </div>
      <div className="mt-auto">
        <OnlyBackNew />
      </div>
    </>
  );
}
