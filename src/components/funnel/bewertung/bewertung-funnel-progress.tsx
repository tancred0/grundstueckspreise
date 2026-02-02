import { useBewertungsFunnel } from "./bewertung-funnel-context";

const useFunnelProgress = () => {
	const { data } = useBewertungsFunnel();

	// Define total steps and current step weights
	// const TOTAL_STEPS = 12; // Adjust based on your total possible steps
	const getStepProgress = (step: number) => {
		// You can adjust these progress percentages based on your flow
		const stepMap: Record<number, number> = {
			0: 8,
			1: 16,
			10: 24,
			11: 32,
			12: 40,
			51: 48,
			52: 56,
			70: 64,
			71: 72,
			80: 80,
			81: 80,
			72: 88,
			97: 92,
			98: 100,
			99: 100,
		};

		return stepMap[step] ?? 0;
	};

	return getStepProgress(data.step);
};

export default useFunnelProgress;
