import { useBRWFunnel } from "../brw-funnel-context";
import { XSquareIcon, MailCheck } from "lucide-react";
import type { DataArrayItem } from "../brw-types";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import { useState } from "react";
import StepsComponent from "../../steps-component";
import { OnlyBackNew } from "../brw-navigation";


export default function AppraisalConfirmationScreen() {
  const { setData, data, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);  
  const analytics = useRudderStackAnalytics();

  const multipleChoiceData: DataArrayItem[] = [
    {
      name: "Ja, weiterleiten.",
      // icon: <Mail />,
      icon: <MailCheck />,
      nextScreen: 97,
      value: "true",
    },
    {
      name: "Nein, nicht weiterleiten.",
      // icon: <MailX />,
      icon: <XSquareIcon />,
      nextScreen: 97,
      value: "false",
    },
  ];

  const handleSubmit = (item: DataArrayItem) => {
    // Convert string value back to boolean for data storage
    const boolValue = item.value === "true";

    // set the data
    setData((prevData) => {
      return {
        ...prevData,
        data: {
          ...prevData.data,
          intention_appraisal_confirmation: boolValue,
        },
      };
    });

    // analytics?.track("Funnel Appraisal Confirmation", {
    //   ...data.data,
    //   intention_appraisal_confirmation: boolValue,
    // });


    goToScreen(item.nextScreen);
  };

  const heading = "Dürfen wir dem Gutachter Ihre Daten weiterleiten, damit dieser Sie kontaktieren darf?";
  const description = "Dieser kann Ihnen eine Auskunft geben welche Art von Gutachten Sie ggf. benötigen.";

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
