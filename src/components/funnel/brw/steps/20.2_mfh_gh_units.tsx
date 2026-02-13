import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { OnlyForward, OnlyBack, OnlyBackNew } from "../brw-navigation";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { useBRWFunnel } from "../brw-funnel-context";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import type { DataArrayItem } from "../brw-types";

export default function Mfh_Gh_UnitsScreen() {
  const { data, setData, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleSubmit = (item: DataArrayItem) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        property_house_units: parseInt(item.value),
      },
    }));


    goToScreen(item.nextScreen);
  };

  const heading = "Wieviele Einheiten hat das Gebäude?";
  const multipleChoiceData: DataArrayItem[] = [
    {
      icon: <>1</>,
      value: "1",
      nextScreen: 21,
    },
    {
      icon: <>2</>,
      value: "2",
      nextScreen: 21,
    },
    {
      icon: <>3-5</>,
      value: "4",
      nextScreen: 21,
    },
    {
      icon: <>6-10</>,
      value: "8",
      nextScreen: 21,
    },
    {
      icon: <>11-20</>,
      value: "15",
      nextScreen: 21,
    },
    {
      icon: <>21+</>,
      value: "25",
      nextScreen: 21,
    },
  ];

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
