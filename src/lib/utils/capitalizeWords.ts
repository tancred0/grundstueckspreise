export default function capitalizeWords(str: string): string {
	if (!str) return str;
	return str.replace(/(?<=^|[ -])[a-zA-ZäöüßÄÖÜ]/g, (char) =>
		char.toUpperCase(),
	);
}
