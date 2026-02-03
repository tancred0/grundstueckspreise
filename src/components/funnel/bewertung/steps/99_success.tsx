import { CheckCircle, FileText, Hourglass } from "lucide-react";
import Image from "next/image";
import iconLong from "@/images/general/logo_wide_black_font.svg";
import { Trust } from "../../trust";
import { useBewertungsFunnel } from "../bewertung-funnel-context";

export default function SuccessScreen() {
	const { data } = useBewertungsFunnel();

	const heading = "Anfrage abgeschlossen";
	const subheading = (
		<>
			<div className="mb-2">
				Vielen Dank für Ihre Anfrage, {data.data.user_salutation}{" "}
				{data.data.user_lastname}.
			</div>{" "}
			<br />
			Wir kümmern uns nun um Ihre Unterlagen. Diese erhalten Sie im Anschluss
			per E-Mail. Sollten wir Rückfragen haben, melden wir uns persönlich bei
			Ihnen.
		</>
	);

	return (
		<>
			{/* Header with internal reference number - using negative margins to align with container edges */}
			<div className="-mx-4 -mt-4 flex items-center justify-center rounded-t-xl bg-primary p-4 md:-mx-10 md:-mt-10 md:p-6">
				<div className="flex items-center gap-3 text-center text-primary-foreground text-xs md:text-base">
					<span className="whitespace-nowrap">Ihre Vorgangsnummer:</span>
					<span className="whitespace-nowrap font-semibold">
						{data.data.int_process_number || "BRW-2026-839201"}
					</span>
				</div>
			</div>

			<div className="mt-6 mb-6">
				<div className="mb-3 flex justify-center">
					<CheckCircle className="h-12 w-12 text-primary" />
				</div>
				<h2 className="text-xl font-semibold text-primary md:text-2xl text-center">{heading}</h2>
				<div className="mt-2 text-center text-base text-primary">
					{subheading}
				</div>
			</div>

			{/* Pending sections */}
			<div className="my-4 space-y-2 md:my-6">
				<div className="flex items-center justify-center gap-3 rounded-lg bg-accent p-3">
					<span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
					<span className="text-center font-medium text-primary text-xs md:text-base">
						Bearbeitung durch Sachverständigenabteilung läuft
					</span>
					<Hourglass className="h-8 w-8 text-primary" />
				</div>
				<div className="flex items-center justify-center gap-3 rounded-lg p-3 opacity-40">
					<span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground"></span>
					<span className="text-muted-foreground text-xs md:text-base">
						Unterlagen erhalten
					</span>
					<FileText className="h-5 w-5 text-muted-foreground" />
				</div>
			</div>

			<div className="mx-auto mt-auto">
				<Image
					alt="Immobilienpreise Deutschland"
					src={iconLong}
					width={200}
					height={40}
				/>
			</div>
			<div className="mx-auto mt-4">
				<Trust />
			</div>
			<div className="mx-auto mt-4 text-center">
				<p className="text-muted-foreground text-xs">
					Hinweis: Diese Auskunft ersetzt kein Verkehrswertgutachten nach §
					194 BauGB.
				</p>
			</div>
		</>
	);
}
