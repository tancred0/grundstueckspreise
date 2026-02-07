"use client";

import { Building, Factory, Home, TreeDeciduous } from "lucide-react";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Trust } from "@/components/funnel/trust";
import { sendGAEvent } from "@/components/utils/analytics";
import { generateTransactionNumber } from "@/components/utils/generateTransactionNumber";
import getGAUserId from "@/components/utils/getGAUserId";
import iconLong from "@/images/general/logo_wide_black_font.svg";
import { storage } from "@/lib/storage";
import { FunnelButtonLarge } from "../bewertung-funnel-button";
import { useBewertungsFunnel } from "../bewertung-funnel-context";
import type { DataArrayItem } from "../bewertung-types";
// import { getUTMParameters } from "@/utils/getUTMParameters";

export default function PropertyTypeScreen({
	cityName,
	locationName,
}: {
	cityName?: string;
	locationName?: string;
}) {
	const { setData, data, goToScreen } = useBewertungsFunnel();
	const [stateUrl, setStateUrl] = useState<string | null>(null);
	const [cityUrl, setCityUrl] = useState<string | null>(null);
	const [districtUrl, setDistrictUrl] = useState<string | null>(null);
	const [firstPageVisited, setFirstPageVisited] = useState<string | null>(null);
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

	// const utmParams = getUTMParameters();
	// console.log(utmParams);

	const nextScreen = 1;
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const heading = locationName
		? `Jetzt kostenlos Ihre Immobilie in ${locationName} bewerten!`
		: "Jetzt kostenlos Ihre Immobilie bewerten!";
	const description = "Welche Immobilie möchten Sie bewerten?";
	const multipleChoiceData = [
		{
			name: "Wohnung",
			icon: <Building />,
			nextScreen: 11,
			value: "Wohnung",
		},
		{
			name: "Haus",
			icon: <Home />,
			nextScreen: nextScreen,
			value: "Haus",
		},
		{
			name: "Gewerbe",
			icon: <Factory />,
			nextScreen: nextScreen,
			value: "Gewerbe",
		},
		{
			name: "Grundstück",
			icon: <TreeDeciduous />,
			nextScreen: nextScreen,
			value: "Grundstück",
		},
	];

	const handleSubmit = (item: DataArrayItem) => {
		const phc = storage.getJSON(
			"ph_phc_Xte7Ml9fMfnb4CTYTcANcd8RWdw1cc4zSh28mX1pBVM_posthog",
		);
		// @ts-expect-error
		let firstPagePH = phc?.$client_session_props?.props?.u;
		if (firstPagePH === undefined) {
			firstPagePH = firstPageVisited;
		} else if (firstPagePH.startsWith("https:")) {
			firstPagePH = firstPagePH.replace(
				"https://www.immobilienpreise-2026.de",
				"",
			);
		}

		const trackingData = {
			...data.data,
			property_type: item.value,
			track_page_funnel_submitted: utmUrl,
			track_ga_user_id: getGAUserId(),
			track_rs_anonymous_id: analytics?.getAnonymousId(),
			track_rs_session_id: analytics?.getSessionId(),
			track_url_state: stateUrl !== "" ? stateUrl : null,
			track_url_city: cityUrl !== "" ? cityUrl : null,
			track_url_district: districtUrl !== "" ? districtUrl : null,
			track_page_first_visit: firstPagePH,
			track_funnel_started_at: new Date(),
			property_city: cityName ?? null,
			int_process_number: generateTransactionNumber(),
		};

		if (item.value === "Wohnung") {
			trackingData.property_type_details = item.value;
		}

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
			},
		});

		sendGAEvent({
			action: "BRW | Funnel Started",
			data: trackingData,
		});

		goToScreen(item.nextScreen);
	};

	return (
		<div className="flex flex-col items-center p-2 md:p-4">
			{/* Header */}
			<div className="mb-8 w-full max-w-3xl space-y-3 text-center ">
				<div className="text-2xl font-bold text-primary md:text-3xl">{heading}</div>
				<p className="text-base text-muted-foreground md:text-lg">{description}</p>
			</div>

			{/* Property Type Buttons */}
			<div className="mb-10 grid w-full max-w-3xl grid-cols-2 gap-4">
				{multipleChoiceData.map((item, index) => (
					<FunnelButtonLarge
						index={index}
						isHover={hoverIndex === index}
						item={item}
						key={index}
						onclick={() => handleSubmit(item)}
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
					/>
				))}
			</div>

			{/* Logo */}
			<div className="mb-6">
				<Image
					alt="Immobilienpreise Deutschland"
					src={iconLong}
					width={200}
					height={40}
				/>
			</div>

			{/* Trust Badges */}
			<Trust />
		</div>
	);
}
