import type { Metadata } from "next";
import Bewertung from "@/components/content/10_Landing/bewertung";
export const metadata: Metadata = {
	title: `Grundstückswert-Rechner 2026 | Jetzt kostenlos abfragen`,
	description: `Aktuelle Grundstückswerte 2026 deutschlandweit. Jetzt kostenlos Grundstückswert für Ihre Adresse abfragen.`,
};

export default function Page() {
	return <Bewertung />;
}
