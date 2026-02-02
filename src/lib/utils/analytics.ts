declare global {
	interface Window {
		dataLayer?: Record<string, unknown>[];
	}
}

type GAEventData = Record<
	string,
	string | number | boolean | null | undefined | Date
>;

export const sendGAEvent = ({
	action,
	data,
}: {
	action: string;
	data: GAEventData;
}) => {
	if (typeof window !== "undefined" && window.dataLayer) {
		window.dataLayer.push({
			event: action,
			...data, // Merge data into the same object
		});
		// console.log("send event to GA", action, data);
	} else {
		console.log("GA not available");
	}
};
