import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "@/components/funnel/brw/brw-types";
import { useState } from "react";

import { Home, Warehouse, Building, Factory } from "lucide-react";

import { OnlyBack, OnlyBackNew } from "../brw-navigation";
import FunnelButton, { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import StepsComponent from "../../steps-component";

export default function PropertyTypeScreen() {
  const { setData, goToScreen, data } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const nextScreen = 201;
  const heading = "Welche Immobilie soll bewertet werden?";
  const multipleChoiceData = [
    {
      name: "Wohnung",
      icon: <Building />,
      nextScreen: 21,
      value: "Wohnung",
    },
    {
      name: "Haus",
      icon: <Home />,
      nextScreen: nextScreen,
      value: "Haus",
    },
    {
      name: "Gewerbe",
      icon: <Factory />,
      nextScreen: nextScreen,
      value: "Gewerbe",
    },
  ];

  const handleSubmit = (item: DataArrayItem) => {

    setData((prevData) => {

      const updatedData = {
        ...prevData.data,
        property_type: item.value,
      };

      if (item.value === "Wohnung") {
        updatedData.property_type_details = item.value;
      }

      // analytics?.track("Funnel Property Type Submitted", updatedData);

      return {
        ...prevData,
        data: updatedData,
      };
    });

    goToScreen(item.nextScreen);
  };

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
