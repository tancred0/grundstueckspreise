import { CheckCircle, FileText, Hourglass } from "lucide-react";
import Image from "next/image";
import iconLong from "@/images/funnel/immopreise-2026.svg";
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
		<div className="h-full rounded-lg bg-blue-10 p-4 md:rounded-2xl">
			<div className="flex h-full flex-col rounded-lg bg-white p-4 md:rounded-2xl md:p-12">
				{/* Header with internal reference number - using negative margins to align with container edges */}
				<div className="-mx-4 -mt-4 flex items-center justify-center rounded-t-lg bg-blue-90 p-4 md:-mx-12 md:-mt-12 md:p-6">
					<div className="flex items-center gap-3 text-center text-white text-xs md:text-base">
						<span className="whitespace-nowrap">Ihre Vorgangsnummer:</span>
						<span className="whitespace-nowrap font-semibold">
							{data.data.int_process_number || "BRW-2026-839201"}
						</span>
					</div>
				</div>

				<div className="mt-6 mb-6">
					<div className="mb-3 flex justify-center">
						<CheckCircle className="h-12 w-12 text-blue-90" />
					</div>
					<div className="funnel-h2">{heading}</div>
					<div className="mt-2 text-center text-base text-blue-90">
						{subheading}
					</div>
				</div>

				{/* Pending sections */}
				<div className="my-4 space-y-2 md:my-6">
					<div className="flex items-center justify-center gap-3 rounded-lg bg-blue-50 p-3">
						<span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-90"></span>
						<span className="text-center font-medium text-blue-90 text-xs md:text-base">
							Bearbeitung durch Sachverständigenabteilung läuft
						</span>
						<Hourglass className="h-8 w-8 text-blue-90" />
					</div>
					<div className="flex items-center justify-center gap-3 rounded-lg p-3 opacity-40">
						<span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
						<span className="text-gray-500 text-xs md:text-base">
							Unterlagen erhalten
						</span>
						<FileText className="h-5 w-5 text-gray-500" />
					</div>
				</div>

				<div className="mx-auto mt-auto">
					<Image
						alt="Logo Bodenrichtwerte Deutschland - Wide"
						src={iconLong}
						width={185}
					/>
				</div>
				<div className="mx-auto mt-4">
					<Trust />
				</div>
				<div className="mx-auto mt-4 text-center">
					<p className="text-gray-400 text-xs">
						Hinweis: Diese Auskunft ersetzt kein Verkehrswertgutachten nach §
						194 BauGB.
					</p>
				</div>
			</div>
		</div>
	);
}
