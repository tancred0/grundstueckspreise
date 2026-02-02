import { Check, Clock, Lock } from "lucide-react";
import type { Metadata } from "next";
import { GoDatabase } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiTimer } from "react-icons/pi";
import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import FooterLight from "@/components/layout/footer-light";

export const metadata: Metadata = {
	title: `Kostenloser Immobilienwert-Rechner 2026 | Jetzt kostenlos abfragen`,
	description: `Jetzt kostenlos den Immobilienwert für Ihre Adresse abfragen.`,
};

const VALUE_PROPS = [
	{
		icon: <Clock className="h-5 w-5" />,
		text: "In 2 Minuten Formular ausfüllen",
	},
	{
		icon: <Check className="h-5 w-5" />,
		text: "Ergebnis sofort online abrufen",
	},
	{
		icon: <Lock className="h-5 w-5" />,
		text: "100% kostenlos & unverbindlich",
	},
];

const BENEFITS = [
	{
		icon: <IoPricetagsOutline />,
		text: "Kostenlos",
		description: "Die Immobilienbewertung ist komplett kostenlos.",
	},
	{
		icon: <PiTimer />,
		text: "Schnell",
		description:
			"Du erhältst deine Immobilienbewertung bereits nach 3 Minuten per E-Mail.",
	},
	{
		icon: <GoDatabase />,
		text: "Datenbasiert",
		description:
			"Die Immobilienbewertung basiert auf aktuellen Daten aus Deutschland.",
	},
];
const STEPS = [
	{
		number: 1,
		title: "Erfassung der Angaben",
		description:
			"Keine Dokumente, nur wenige Informationen wie die Adresse, Wohnfläche, Zimmeranzahl, Baujahr und allenfalls das Jahr der letzten Renovation.",
	},
	{
		number: 2,
		title: "Berechnung des Marktpreises",
		description:
			"In nur drei Minuten schätzen wir den Marktwert deiner Immobilie. Der Marktwert wird anhand von über 70 Einflussfaktoren geschätzt. Die Datengrundlage wird vierteljährlich an die aktuellen Markttrends angepasst und ergänzt.",
	},
	{
		number: 3,
		title: "Ergebnisse sofort per E-Mail",
		description:
			"Wir senden dir deine kostenlose Immobilienbewertung in nur 3 Minuten per E-Mail zu. Es war noch nie so einfach, den Wert deiner Immobilie schätzen zu lassen und einen erfolgreichen Immobilienverkauf zu planen!",
	},
];

export default function Page() {
	return (
		<div className="min-h-screen">
			<section className="bg-gradient-to-b from-white to-slate-50">
				<div className="container mx-auto max-w-4xl px-4 pt-6 pb-8">
					<div className="space-y-6">
						<div
							className="rounded-xl border border-slate-100 bg-white p-4 shadow-lg md:p-6"
							id="form"
						>
							<BewertungsFunnel />
						</div>
						<div className="mt-2 flex justify-end">
							{/* <LastLeadSubmitted /> */}
						</div>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
							{VALUE_PROPS.map((prop, index) => (
								<div
									className="flex items-center gap-2 text-slate-700 text-sm"
									key={index}
								>
									<div className="flex-shrink-0 text-primary">{prop.icon}</div>
									<span>{prop.text}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-12">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid gap-8 text-center md:grid-cols-3">
						{BENEFITS.map((benefit, index) => (
							<div className="flex flex-col items-center" key={index}>
								<div className="mb-4 text-4xl text-primary">{benefit.icon}</div>
								<h3 className="mb-2 font-semibold text-xl">{benefit.text}</h3>
								<p className="text-slate-600">{benefit.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Detailed Steps Section */}
			<section className="bg-slate-50 py-12">
				<div className="container mx-auto max-w-4xl px-4">
					<h2 className="mb-10 text-center font-bold text-2xl md:text-3xl">
						In nur 3 Minuten zur Bewertung
					</h2>

					<div className="space-y-8">
						{STEPS.map((step, index) => (
							<div className="flex gap-6" key={index}>
								<div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-slate-100 font-bold text-primary text-xl">
									{step.number}
								</div>
								<div>
									<div className="h3 mb-2 font-semibold text-primary text-xl">
										{step.title}
									</div>
									<p className="text-slate-700">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<FooterLight />
		</div>
	);
}
