import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { NewLead } from "@/server/db/schema";

// Frontend-only fields that don't get persisted to DB
type FrontendOnlyFields = {
  leadId?: string | null; // Reference to existing lead for updates
};

// Main data type: DB schema + frontend-only fields
export type RealEstateData = NewLead & FrontendOnlyFields;

export type UTMParameters = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  utm_channel?: string | null;
  utm_adid?: string | null;
  utm_cid?: string | null;
  utm_agid?: string | null;
  utm_dev?: string | null;
  utm_devicemodel?: string | null;
  utm_loc?: string | null;
  utm_mt?: string | null;
  utm_nw?: string | null;
  utm_targetid?: string | null;
  utm_placement?: string | null;
  utm_target?: string | null;
  utm_position?: string | null;
  utm_aceid?: string | null;
  utm_physicalcity?: string | null;
  utm_physicalcountry?: string | null;
  utm_googleplaceid?: string | null;
  utm_extensionid?: string | null;
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
};

export type StateData = {
  data: RealEstateData;
  step: number;
  prevSteps: number[];
};

export type ScreenProps = {
  data: StateData;
  setData: Dispatch<SetStateAction<StateData>>;
};

export type DataArrayItem = {
  name?: React.ReactNode;
  description?: string;
  value: string;
  icon: any;
  nextScreen: number;
};

export type DataArrayItemBool = {
  name: string;
  value: boolean;
  icon: any;
  nextScreen: number;
};

export function isValidCoverageResponse(
  response: any
): response is { hasCoverage: boolean } {
  return response && typeof response.hasCoverage === "boolean";
}
