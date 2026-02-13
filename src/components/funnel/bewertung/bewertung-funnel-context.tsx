import type React from "react";
import type { JSX } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { UTM_STORAGE_EVENT } from "@/components/tracking/UTMTracker";
import { env } from "@/env";
import { storage } from "@/lib/storage";
import type { StateData, UTMParameters } from "./bewertung-types";

type UseFunnelContextType = {
	data: StateData;
	setData: React.Dispatch<React.SetStateAction<StateData>>;
	goToScreen: (nextScreen: number, isForwardScreen?: boolean) => void;
	goBack: () => void;
};

const FunnelContextType = createContext<UseFunnelContextType | null>(null);

export const BewertungsFunnelProvider = ({
	children,
}: React.PropsWithChildren<{
	children: JSX.Element;
}>) => {
	// Get initial UTM params, might be null if not yet saved
	const initialUtmParams = storage.getJSON("utmParams") as UTMParameters | null;

	const [data, setData] = useState<StateData>({
		data: {
			track_funnel_version: "1.0",
			track_funnel_type: "Immobilienbewertung",
			track_funnel_source: "Grundstückspreise Deutschland",
			track_environment: env.NEXT_PUBLIC_ENV,
			...(initialUtmParams || {}), // Safely spread UTM params if they exist
		},
		step: 0,
		prevSteps: [],
	});

	// Listen for UTM parameter updates
	useEffect(() => {
		const handleUtmUpdate = (event: CustomEvent<UTMParameters>) => {
			setData((prevData) => ({
				...prevData,
				data: {
					...prevData.data,
					...event.detail, // Update with new UTM parameters
				},
			}));
		};

		// Add event listener for UTM updates
		window.addEventListener(
			UTM_STORAGE_EVENT,
			handleUtmUpdate as EventListener,
		);

		// Cleanup
		return () => {
			window.removeEventListener(
				UTM_STORAGE_EVENT,
				handleUtmUpdate as EventListener,
			);
		};
	}, []);

	// Debug
	useEffect(() => {
		console.log("FunnelProvider data updated:", data);
	}, [data]);

	const goToScreen = (nextScreen: number, isForwardScreen: boolean = false) => {
		setData((prevData) => {
			const newPrevSteps = prevData.prevSteps;

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
				prevData.prevSteps.length,
			);
			return {
				data: prevData.data,
				prevSteps: newPrevSteps,
				step: prevStep,
			};
		});
	};

	return (
		<FunnelContextType.Provider
			value={{
				data,
				setData,
				goToScreen,
				goBack,
			}}
		>
			{children}
		</FunnelContextType.Provider>
	);
};

export function useBewertungsFunnel(): UseFunnelContextType {
	const value = useContext(FunnelContextType);

	if (!value) {
		throw new Error("Must be used inside Funnel provider");
	}

	return value as NonNullable<UseFunnelContextType>;
}
