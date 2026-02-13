
import { useBRWFunnel } from "../brw-funnel-context";
import { OnlyBackNew } from "../brw-navigation";

import type { DataArrayItem } from "@/components/funnel/brw/brw-types";

import { Users, User, SquareUser } from "lucide-react";
import PersonStrikedIcon from "@/components/funnel/icons/personStriked";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { FunnelButtonLarge, FunnelButtonNew } from "../brw-funnel-button";
import { useState } from "react";
import StepsComponent from "../../steps-component";


export default function UserIsOwnerScreen() {
  const { setData, data, goToScreen } = useBRWFunnel();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const analytics = useRudderStackAnalytics();

  const heading = "Sind Sie der Eigentümer des Grundstücks?";
  const nextScreen = 4
  const multipleChoiceData: DataArrayItem[] = [
    {
      name: "Ja, ich bin Eigentümer.",
      icon: <User />,
      nextScreen: nextScreen,
      value: "yes",
    },
    {
      name: "Ich bin Teil-Eigentümer.",
      icon: <Users />,
      nextScreen: nextScreen,
      value: "part-owner",
    },
    {
      name: "Ich bin Angehöriger.",
      icon: <SquareUser />,
      nextScreen: nextScreen,
      value: "relative",
    },
    {
      name: "Nein, ich bin nicht Eigentümer.",
      icon: <PersonStrikedIcon width="24" height="24" />,
      nextScreen: nextScreen,
      value: "no",
    },
  ];

  const handleSubmit = (item: DataArrayItem) => {
    // fire some event
    // ga.sendEvent('funnel', 'click', 'choose_address', item.name)

    // set the data
    setData((prevData) => {
      return {
        ...prevData,
        data: {
          ...prevData.data,
          user_is_owner: item.value,
        },
      };
    });

    analytics?.track(
      "Funnel Owner Type Submitted",
      {
        ...data.data,
        user_is_owner: item.value,
      },
      {
        campaign: {
          gclid: data.data.gclid,
          gbraid: data.data.gbraid,
          wbraid: data.data.wbraid,
        }
      }
    );
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
