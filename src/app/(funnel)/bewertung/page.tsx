import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Bewertung from "@/components/content/10_Landing/bewertung";
export const metadata: Metadata = {
	title: `Bodenrichtwert-Rechner 2026 | Jetzt kostenlos abfragen`,
	description: `Aktuelle Bodenrichtwerte 2026 deutschlandweit. Jetzt kostenlos Grundstückswert für Ihre Adresse abfragen.`,
};

export default function Page() {
	redirect("/bewertung/bewertung");
}
