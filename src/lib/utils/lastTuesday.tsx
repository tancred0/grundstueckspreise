export default function lastTuesday() {
	const currentDate = new Date();
	const dayOfWeek = currentDate.getDay();
	let lastTuesday;

	if (dayOfWeek >= 4) {
		// If it's Thursday or later
		// Subtract the difference between the current day and Tuesday
		lastTuesday = new Date(
			currentDate.setDate(currentDate.getDate() - (dayOfWeek - 2)),
		);
	} else {
		// If it's Monday or Tuesday
		// Subtract to get to last week's Tuesday
		lastTuesday = new Date(
			currentDate.setDate(currentDate.getDate() - (dayOfWeek + 6)),
		);
	}
	// Format the date in German locale
	const lastTuesdayFormatted = lastTuesday.toLocaleDateString("de-DE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	return lastTuesdayFormatted;
}
