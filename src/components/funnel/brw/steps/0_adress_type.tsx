"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Map } from "lucide-react";

import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Trust } from "@/components/funnel/trust";
// import { sendGAEvent } from "@/components/utils/analytics";
import { generateTransactionNumber } from "@/components/utils/generateTransactionNumber";
import getGAUserId from "@/components/utils/getGAUserId";
import { storage } from "@/lib/storage";
import { FunnelButtonLarge } from "../brw-funnel-button";
import { useBRWFunnel } from "../brw-funnel-context";
import type { DataArrayItem } from "../brw-types";

export default function AdressTypeScreen({ locationName, type = "brw" }: { cityName?: string, locationName?: string, type?: "brw" | "grundstuckspreis" }) {
  const { setData, data, goToScreen } = useBRWFunnel();
  const [stateUrl, setStateUrl] = useState<string | null>(null);
  const [cityUrl, setCityUrl] = useState<string | null>(null);
  const [districtUrl, setDistrictUrl] = useState<string | null>(null);
  const [firstPageVisited, setFirstPageVisited] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const analytics = useRudderStackAnalytics();
  const utmUrl = usePathname();

  useEffect(() => {
    // Only fetch the URL values after a delay
    const timer = setTimeout(() => {
      setStateUrl(storage.get("stateUrl"));
      setCityUrl(storage.get("cityUrl"));
      setDistrictUrl(storage.get("districtUrl"));
      setFirstPageVisited(storage.get("firstPageVisited"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  const heading = (() => {
    switch (type) {
      case "grundstuckspreis":
        return locationName
          ? `Jetzt aktuellen Grundstückspreis für ${locationName} abfragen!`
          : "Jetzt aktuellen Grundstückspreis abfragen!";
      case "brw":
      default:
        return locationName
          ? `Jetzt aktuellen Bodenrichtwert für ${locationName} abfragen!`
          : "Jetzt aktuellen Bodenrichtwert abfragen!";
    }
  })();
  const description = type === "grundstuckspreis" ? "Für welches Grundstück benötigen Sie den Grundstückspreis?" : "Für welches Grundstück benötigen Sie den Bodenrichtwert?";

  const multipleChoiceData = [
    {
      name: "Adresse",
      icon: <MapPin />,
      nextScreen: 1,
      value: "address",
    },
    {
      name: "Flurstück angeben",
      icon: <Map />,
      nextScreen: 2,
      value: "flurstueck",
    },
  ];

  const handleSubmit = (item: DataArrayItem) => {
    // Fallback to current pathname if FirstPageTracker hasn't set the value yet (race condition)
    const firstPage = firstPageVisited ?? utmUrl;

    const trackingData = {
      ...data.data,
      property_location_type: item.value,
      track_page_funnel_submitted: utmUrl,
      track_ga_user_id: getGAUserId(),
      track_rs_anonymous_id: analytics?.getAnonymousId(),
      track_rs_session_id: analytics?.getSessionId(),
      track_url_state: stateUrl !== "" ? stateUrl : null,
      track_url_city: cityUrl !== "" ? cityUrl : null,
      track_url_district: districtUrl !== "" ? districtUrl : null,
      track_page_first_visit: firstPage,
      int_process_number: generateTransactionNumber(),
      track_funnel_started_at: new Date(),
    };

    // set the data
    setData((prevData) => ({
      ...prevData,
      data: trackingData,
    }));

    // fire analytics events
    analytics?.track("Funnel Started", trackingData, {
      campaign: {
        gclid: data.data.gclid,
        gbraid: data.data.gbraid,
        wbraid: data.data.wbraid,
      }
    });

    // sendGAEvent({
    //   action: "BRW | Funnel Started",
    //   data: trackingData,
    // });

    goToScreen(item.nextScreen);
  };

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-8 md:px-8 md:py-12">
      {/* Header - Top */}
      <div className="w-full max-w-3xl space-y-3 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">{heading}</h1>
        <p className="text-lg text-primary/80 md:text-xl">{description}</p>
      </div>

      {/* Address Type Buttons - Middle */}
      <div className="my-auto grid w-full max-w-3xl grid-cols-2 gap-4 py-8">
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

      {/* Trust Badges - Bottom */}
      <div className="mt-auto pt-4">
        <Trust />
      </div>
    </div>
  );
}
