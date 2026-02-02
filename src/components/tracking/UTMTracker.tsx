"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { UTMParameters } from "@/components/funnel/bewertung/bewertung-types";
import { storage } from "@/lib/storage";

export const UTM_STORAGE_EVENT = "utm-params-updated";

const UTM_PARAMS = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
	"gclid",
	"gbraid",
	"wbraid",
] as const;

export function UTMTracker() {
	const searchParams = useSearchParams();

	useEffect(() => {
		const params: Partial<UTMParameters> = {};
		let hasParams = false;

		for (const param of UTM_PARAMS) {
			const value = searchParams.get(param);
			if (value) {
				params[param] = value;
				hasParams = true;
			}
		}

		if (hasParams) {
			// Get existing params and merge with new ones
			const existingParams = storage.getJSON<UTMParameters>("utmParams") ?? {};
			const mergedParams = { ...existingParams, ...params };

			// Save to storage
			storage.setJSON("utmParams", mergedParams);

			// Dispatch event so funnel context can update
			window.dispatchEvent(
				new CustomEvent<UTMParameters>(UTM_STORAGE_EVENT, {
					detail: mergedParams as UTMParameters,
				}),
			);
		}
	}, [searchParams]);

	return null;
}

export default UTMTracker;
