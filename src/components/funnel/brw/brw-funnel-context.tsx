import React, { createContext, useContext, useState, useEffect } from "react";
import type { StateData, UTMParameters } from "./brw-types";
import { storage } from "@/lib/storage";
import { UTM_STORAGE_EVENT } from "@/components/tracking/UTMTracker";

type UseBRWFunnelContextType = {
  data: StateData;
  setData: React.Dispatch<React.SetStateAction<StateData>>;
  goToScreen: (nextScreen: number, isForwardScreen?: boolean) => void;
  goBack: () => void;
};

const BRWFunnelContext = createContext<UseBRWFunnelContextType | null>(null);

export const BRWFunnelProvider = ({
  children,
  cityName,
}: {
  children: React.ReactNode;
  cityName?: string;
}) => {
  // Get initial UTM params, might be null if not yet saved
  const initialUtmParams = storage.getJSON("utmParams") as UTMParameters | null;

  const [data, setData] = useState<StateData>({
    data: {
      track_funnel_version: "2.0",
      track_funnel_type: "Bodenrichtwert",
      track_funnel_source: "Grundstückspreise Deutschland",
      brw_show_online: false,
      property_city: cityName,
      track_environment: process.env.NEXT_PUBLIC_ENV,
      ...(initialUtmParams || {}),
    },
    step: 0,
    prevSteps: [],
  });

  // Listen for UTM parameter updates
  useEffect(() => {
    const handleUtmUpdate = (event: CustomEvent<UTMParameters>) => {
      setData(prevData => ({
        ...prevData,
        data: {
          ...prevData.data,
          ...event.detail,
        }
      }));
    };

    window.addEventListener(
      UTM_STORAGE_EVENT,
      handleUtmUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        UTM_STORAGE_EVENT,
        handleUtmUpdate as EventListener
      );
    };
  }, []);

  // Debug
  useEffect(() => {
    console.log("FunnelProvider data updated:", data);
  }, [data]);

  const goToScreen = (nextScreen: number, isForwardScreen: boolean = false) => {
    setData((prevData) => {
      let newPrevSteps = prevData.prevSteps;

      if (!isForwardScreen) {
        newPrevSteps.push(prevData.step);
      }
      return {
        ...prevData,
        step: nextScreen,
        prevSteps: newPrevSteps,
      };
    });
  };

  const goBack = () => {
    setData((prevData) => {
      const prevStep = prevData.prevSteps.pop() || 0;
      const newPrevSteps = prevData.prevSteps.slice(
        0,
        prevData.prevSteps.length
      );
      return {
        data: prevData.data,
        prevSteps: newPrevSteps,
        step: prevStep,
      };
    });
  };

  return (
    <BRWFunnelContext.Provider
      value={{
        data,
        setData,
        goToScreen,
        goBack,
      }}
    >
      {children}
    </BRWFunnelContext.Provider>
  );
};

export function useBRWFunnel(): UseBRWFunnelContextType {
  const value = useContext(BRWFunnelContext);

  if (!value) {
    throw new Error("Must be used inside BRW Funnel provider");
  }

  return value as NonNullable<UseBRWFunnelContextType>;
}
