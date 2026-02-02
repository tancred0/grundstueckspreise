type GAEventParams = {
	action: string;
	data?: Record<string, unknown>;
};

export function sendGAEvent({ action, data }: GAEventParams): void {
	if (typeof window === "undefined") return;

	try {
		// Send to Google Analytics 4 if gtag is available
		if (typeof window.gtag === "function") {
			window.gtag("event", action, data);
		}
	} catch (e) {
		console.error("Error sending GA event:", e);
	}
}

// Type declaration for gtag
declare global {
	interface Window {
		gtag?: (
			command: string,
			action: string,
			params?: Record<string, unknown>,
		) => void;
	}
}
