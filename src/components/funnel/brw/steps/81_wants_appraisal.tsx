import { useState } from "react";
import { useBRWFunnel } from "../brw-funnel-context";
import { XSquareIcon, ClipboardCheck } from "lucide-react";
import type { DataArrayItemBool } from "../brw-types";
import { FunnelButtonLarge, FunnelButtonNew, FunnelButtonRow } from "../brw-funnel-button";
import StepsComponent from "../../steps-component";
import { OnlyBackNew } from "../brw-navigation";

export default function WantsAppraisalScreen() {
  const { setData, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const multipleChoiceData = [
    {
      name: "Ja, ich bin interessiert.",
      icon: <ClipboardCheck />,
      nextScreen: 82,
      value: true,
    },
    {
      name: "Nein, ich bin nicht interessiert.",
      icon: <XSquareIcon />,
      nextScreen: 97,
      value: false,
    },
  ];

  const handleSubmit = (item: DataArrayItemBool) => {
    // set the data
    setData((prevData) => {
      return {
        ...prevData,
        data: {
          ...prevData.data,
          intention_wants_appraisal: item.value,
        },
      };
    });


    goToScreen(item.nextScreen);
  };

  const heading = "Sind Sie an einer Gutachter-Empfehlung interessiert?";
  const description = "Die Empfehlung ist kostenlos und unverbindlich.";

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
