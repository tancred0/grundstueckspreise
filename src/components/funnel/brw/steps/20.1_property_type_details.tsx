import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "@/components/funnel/brw/brw-types";

import { Building, HelpCircle, Briefcase, Warehouse, Home, Building2 } from "lucide-react";

import { OnlyBack, OnlyBackNew } from "../brw-navigation";
import FunnelButton, { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import { useState } from "react";
import StepsComponent from "../../steps-component";

export default function PropertyTypeDetailsScreen() {
  const { setData, goToScreen, data } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);


  const nextScreen = 21;

  const heading =
    data.data.property_type === "Wohnung"
      ? "Bitte wählen Sie die Art Ihrer Wohnung?"
      : "Bitte wählen Sie die Art Ihres Hauses?";

  let multipleChoiceData: DataArrayItem[] = [];

  switch (data.data.property_type) {
    // case "Wohnung":
    //   console.log("Wohnung");
    //   multipleChoiceData = [
    //     {
    //       name: "Erdgeschoss",
    //       icon: <DynamicBuildingIcon type="Erdgeschoss" lowerHeight={0} upperHeight={1} />,
    //       nextScreen: nextScreen,
    //       value: "Erdgeschoss",
    //     },
    //     {
    //       name: "Etagenwohnung",
    //       icon: <Building />,
    //       nextScreen: nextScreen,
    //       value: "Etagenwohnung",
    //     },
    //     {
    //       name: "Penthouse/Dachgeschoss",
    //       icon: <Building />,
    //       nextScreen: nextScreen,
    //       value: "Penthouse/Dachgeschoss",
    //     },
    //     {
    //       name: "Sonstiges",
    //       icon: <HelpCircle />,
    //       nextScreen: nextScreen,
    //       value: "Sonstiges",
    //     },
    //   ];
    //   break;
    case "Gewerbe":
      multipleChoiceData = [
        {
          name: "Wohn- und Geschäftshaus",
          icon: <Building />,
          nextScreen: 202,
          value: "Wohn- und Geschäftshaus",
        },
        {
          // Bürogebäude
          name: "Bürogebäude",
          icon: <Briefcase />,
          nextScreen: 202,
          value: "Bürogebäude",
        },
        {
          name: "Logistik-/ Industriegebäude",
          icon: <Warehouse />,
          nextScreen: 202,
          value: "Logistik-/ Industriegebäude",
        },
        {
          name: "Sonstiges",
          icon: <HelpCircle />,
          nextScreen: nextScreen,
          value: "Sonstiges",
        },
      ];
      break;
    default:
      // case "Haus":
      multipleChoiceData = [
        {
          name: "Einfamilienhaus",
          icon: <Home />,
          nextScreen: nextScreen,
          value: "Einfamilienhaus",
        },
        {
          name: "Mehrfamilienhaus",
          icon: <Building2 />,
          nextScreen: 202,
          value: "Mehrfamilienhaus",
        },
        {
          name: "Wohn- & Geschäftshaus",
          icon: <Briefcase />,
          nextScreen: 202,
          value: "Wohn- und Geschäftshaus",
        },
        {
          name: "Sonstiges",
          icon: <HelpCircle />,
          nextScreen: nextScreen,
          value: "Sonstiges",
        },
      ];
      break;
  }

  const handleSubmit = (item: DataArrayItem) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        property_type_details: item.value,
      },
    }));

    // analytics?.track("Funnel Property Type Details Submitted", {
    //   ...data.data,
    //   property_type_details: item.value,
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
