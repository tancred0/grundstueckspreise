import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "@/components/funnel/brw/brw-types";

import { CalendarTextIcon } from "../../icons/calendarText";

import { OnlyBack, OnlyBackNew } from "../brw-navigation";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import FunnelButton, { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import { useState } from "react";
import StepsComponent from "../../steps-component";

export default function SellHorizonScreen() {
  const { setData, goToScreen, data } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const analytics = useRudderStackAnalytics();

  const heading = "Wann planen Sie in etwa den Verkauf Ihrer Immobilie?";
  const nextScreen = 5;
  const multipleChoiceData = [
    {
      name: "1-3 Monate",
      icon: <CalendarTextIcon text="1-3" />,
      nextScreen: nextScreen,
      value: "1-3 Monate",
    },
    {
      name: "4-6 Monate",
      icon: <CalendarTextIcon text="4-6" x_start={6} />,
      nextScreen: nextScreen,
      value: "4-6 Monate",
    },
    {
      name: "6-12 Monate",
      icon: <CalendarTextIcon text="6-12" x_start={5} />,
      nextScreen: nextScreen,
      value: "6-12 Monate",
    },
    {
      name: "12 Monate oder später",
      icon: <CalendarTextIcon text="12+" x_start={6.5} />,
      nextScreen: nextScreen,
      value: "12 Monate oder später",
    },
    {
      name: "Unsicher",
      icon: <CalendarTextIcon text="..." x_start={8.5} />,
      nextScreen: nextScreen,
      value: "Unsicher",
    },
    {
      name: "Ich will nicht verkaufen.",
      icon: <CalendarTextIcon text="?" x_start={10.5} />,
      nextScreen: nextScreen,
      value: "Ich will nicht verkaufen",
    },
  ];

  const handleSubmit = (item: DataArrayItem) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        intention_horizon_sell: item.value,
      },
    }));

    analytics?.track("Funnel Sell Horizon Submitted", {
      ...data.data,
      intention_horizon_sell: item.value,
    }, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
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
