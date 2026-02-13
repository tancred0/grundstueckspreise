import { useBRWFunnel } from "../brw-funnel-context";
import { XSquareIcon, ClipboardCheck } from "lucide-react";
import { OnlyBackNew } from "../brw-navigation";
import type { DataArrayItemBool } from "../brw-types";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import { useState } from "react";
import StepsComponent from "../../steps-component";

export default function WithRealEstateScreen() {
  const { setData, goToScreen, data } = useBRWFunnel();
  const analytics = useRudderStackAnalytics();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const heading = "Befindet sich eine Immobilie auf dem Grundstück?";

  const multipleChoiceData = [
    {
      name: "Ja, befindet sich.",
      // icon: <Building2 />,
      icon: <ClipboardCheck />,
      nextScreen: 20,
      value: true,
    },
    {
      name: "Nein, befindet sich nicht.",
      // icon: <Sprout />,
      icon: <XSquareIcon />,
      nextScreen:  40,
      value: false,
    },
  ];

  const handleSubmit = (item: DataArrayItemBool) => {
    // set the data
    setData((prevData) => {
      const updatedData = {
        ...prevData.data,
        property_has_building: item.value,
      };

      // Apply the conditional logic to add property_type if item.value is false
      if (item.value === false) {
        updatedData.property_type = "Grundstück";
      }

      // Return the new state object
      return {
        ...prevData,
        data: updatedData,
      };
    });

    const updatedData = {
      ...data.data,
      property_has_building: item.value,
    };

    // Apply the conditional logic to add property_type if item.value is false
    if (item.value === false) {
      updatedData.property_type = "Grundstück";
    }

    analytics?.track("Funnel Property With Real Estate Submitted", updatedData, {
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
