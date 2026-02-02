export default function slugify(text: string): string {
	const translations: { [key: string]: string } = {
		ü: "ue",
		ä: "ae",
		ö: "oe",
		ß: "ss",
		" ": "-",
	};
	return text
		.toLowerCase()
		.replace(/[üäöß ]/g, (char) => translations[char] || char);
}
