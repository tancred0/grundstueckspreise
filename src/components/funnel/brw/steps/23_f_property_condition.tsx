import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "@/components/funnel/brw/brw-types";

// Import your icons
import { Hammer, Star, Heart } from "lucide-react";

import { OnlyBack, OnlyBackNew } from "../brw-navigation";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import FunnelButton, { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import { useState } from "react";
import StepsComponent from "../../steps-component";

export default function PropertyConditionScreen() {
  const { data, setData, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const analytics = useRudderStackAnalytics();

  // wenn verkauf => 97 (loader)
  // wenn !verkauf => 81 (gutachter)
  let nextScreen = 81;
  if (data.data.intention_request_reason === "Immobilienverkauf") {
    nextScreen = 97;
  }

  const heading = "Wie bewerten Sie den Zustand Ihrer Immobilie?";
  // const nextScreen = 24
  const multipleChoiceData = [
    {
      name: "Renovierungsbedürftig",
      icon: <Hammer />,
      nextScreen: nextScreen,
      value: "Renovierungsbedürftig",
    },
    {
      name: "Gut erhalten",
      icon: <Heart />,
      nextScreen: nextScreen,
      value: "Gut erhalten",
    },
    {
      name: "Neuwertig",
      icon: <Star />,
      nextScreen: nextScreen,
      value: "Neuwertig",
    },
  ];

  const handleSubmit = (item: DataArrayItem) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        property_condition: item.value,
      },
    }));

    // analytics?.track("Funnel Property Condition Submitted", {
    //   ...data.data,
    //   property_condition: item.value,
    // });

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
