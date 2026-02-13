import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "@/components/funnel/brw/brw-types";

import { useState } from "react";
import IconWrapper from "../../icon-wrapper";

import { OnlyBack, OnlyBackNew } from "../brw-navigation";

import { Home, Warehouse, TreeDeciduous, Sprout, HelpCircle, Trees, Tractor } from "lucide-react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { type BrwResponse, getBrwValue } from "@/lib/api/getBrwValue";
import FunnelButton, { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import StepsComponent from "../../steps-component";

export default function GrundstuckPropertyDetailsScreen() {
  const { setData, data, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const analytics = useRudderStackAnalytics();

  // wenn verkauf => 97 (loader)
  // wenn !verkauf => 81 (gutachter)
  let nextScreen = 81; //remove gutachter
  if (data.data.intention_request_reason === "Immobilienverkauf") {
    nextScreen = 97;
  }

  const multipleChoiceData = [
    {
      name: "Bauland",
      icon: <Home />,
      nextScreen: nextScreen,
      value: "Bauland",
    },
    {
      name: "Ackerland",
      icon: <Tractor />,
      nextScreen: nextScreen,
      value: "Ackerland",
    },
    {
      name: "Wald-/Grünland",
      icon: <Trees />,
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

  const handleSubmit = async (item: DataArrayItem) => {
    let brwByType: BrwResponse[] = [];
    if (item.value === "Ackerland") {
      brwByType = await getBrwValue(
        data.data.property_longitude as number,
        data.data.property_longitude as number,
      ) ?? [];
      if (brwByType.length === 0) {
        brwByType = await getBrwValue(
          data.data.property_latitude as number,
          data.data.property_longitude as number,
        ) ?? [];
      }

    } else if (item.value === "Wald-/Grünland") {
      brwByType = await getBrwValue(
        data.data.property_latitude as number,
        data.data.property_longitude as number,
      ) ?? [];

      if (brwByType.length === 0) {
        brwByType = await getBrwValue(
          data.data.property_latitude as number,
          data.data.property_longitude as number,
        ) ?? [];
      }
    }

    const newBrw =
      brwByType.length > 0 && brwByType[0]?.brw ? brwByType[0].brw : data.data.brw_value;

    const updatedValuation =
      newBrw && data.data.property_plot_area
        ? newBrw * data.data.property_plot_area
        : data.data.brw_valuation;

    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        property_type_details: item.value,
        brw_value: newBrw,
        brw_valuation: updatedValuation,
      },
    }));

    goToScreen(item.nextScreen);

    analytics?.track("Funnel Property Type Details Submitted", {
      ...data.data,
      property_type_details: item.value,
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });
  };

  const heading = "Um was für einen Grundstückstypen handelt es sich?";
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


      <div className="hidden md:grid grid-cols-2 gap-4">
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
