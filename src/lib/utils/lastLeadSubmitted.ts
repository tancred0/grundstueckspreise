const REGRESSION_SLOPE = -75.36;
const REGRESSION_INTERCEPT = 428.33;

function predictLastTime(population: number): number {
	return Math.round(
		Math.max(
			6,
			REGRESSION_SLOPE * Math.log10(population) + REGRESSION_INTERCEPT,
		),
	);
}

export function lastLeadSubmitted(
	population: number,
	currentDate?: Date,
): string {
	const frequencyMinutes = predictLastTime(population);

	// Start time (6:24) and end time (23:12) in minutes since midnight
	const startTimeMinutes = 6 * 60 + 24;
	const endTimeMinutes = 23 * 60 + 12;

	// Generate all possible times in the schedule
	const schedule: { timeMinutes: number; timeStr: string }[] = [];
	for (
		let timeMinutes = startTimeMinutes;
		timeMinutes <= endTimeMinutes;
		timeMinutes += frequencyMinutes
	) {
		const hours = Math.floor(timeMinutes / 60);
		const minutes = timeMinutes % 60;
		const timeStr = `${hours}:${minutes.toString().padStart(2, "0")}`;
		schedule.push({ timeMinutes, timeStr });
	}

	// Get current time in German time zone
	const now = currentDate || new Date();
	const germanFormatter = new Intl.DateTimeFormat("de-DE", {
		timeZone: "Europe/Berlin",
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	});

	const dateFormatter = new Intl.DateTimeFormat("de-DE", {
		timeZone: "Europe/Berlin",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	const currentDateStr = dateFormatter.format(now);

	// Calculate yesterday's date
	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayStr = dateFormatter.format(yesterday);

	// Parse current German time
	const germanTimeStr = germanFormatter.format(now);
	const [currentHoursStr, currentMinutesStr] = germanTimeStr.split(":");
	const currentHours = parseInt(currentHoursStr ?? "0", 10);
	const currentMinutes = parseInt(currentMinutesStr ?? "0", 10);
	const currentTimeMinutes = currentHours * 60 + currentMinutes;

	// If current time is before the first schedule time, use yesterday's last time
	if (currentTimeMinutes < startTimeMinutes) {
		return `${yesterdayStr} 23:12`;
	}

	// If current time is after the last schedule time, use today's last time
	if (currentTimeMinutes > endTimeMinutes) {
		return `${currentDateStr} ${schedule[schedule.length - 1]?.timeStr ?? ""}`;
	}

	// Find the latest time in the schedule that is before current time
	let lastValidTime: string | null = null;
	for (const timeSlot of schedule) {
		if (timeSlot.timeMinutes <= currentTimeMinutes) {
			lastValidTime = timeSlot.timeStr;
		} else {
			break; // We've gone past current time
		}
	}

	// If lastValidTime is null, use current time minus 24 minutes
	if (!lastValidTime) {
		const adjustedTime = new Date(now);
		adjustedTime.setMinutes(adjustedTime.getMinutes() - 24);
		const adjustedTimeStr = germanFormatter.format(adjustedTime);
		return `${currentDateStr} ${adjustedTimeStr}`;
	}

	return `${currentDateStr} ${lastValidTime}`;
}

// export function testLastLeadSubmitted(): void {
//   const populations = [
//     1_000_000,
//     500_000,
//     100_000,
//     50_000,
//     25_000,
//     10_000,
//     5_000,
//     1_000
//   ];
//   console.log("Population sizes and their frequencies:");
//   populations.forEach(pop => {
//     const frequency = predictLastTime(pop);
//     console.log(`Population: ${pop}, Frequency: ${frequency} minutes`);
//   });

//   console.log("\nCurrent displayed times for each population:");
//   populations.forEach(pop => {
//     console.log(`Population: ${pop}, Display time: ${lastLeadSubmitted(pop)}`);
//   });
// }
