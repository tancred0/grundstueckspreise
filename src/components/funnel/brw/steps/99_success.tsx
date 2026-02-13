import { useBRWFunnel } from "../brw-funnel-context";
import { CheckCircle, FileText, Hourglass } from "lucide-react";
import { Trust } from "../../trust";

export default function SuccessScreen() {
  const { data } = useBRWFunnel();

  const heading = "Anfrage abgeschlossen"
  const subheading = <>
    <div className="mb-2">Vielen Dank für Ihre Anfrage, {data.data.user_salutation} {data.data.user_firstname} {data.data.user_lastname}.</div> <br />
    Wir kümmern uns nun um Ihre Unterlagen. Diese erhalten Sie im Anschluss per E-Mail.
    Sollten wir Rückfragen haben, melden wir uns persönlich bei Ihnen.</>

  return (
    <>
      {/* Header with internal reference number - using negative margins to align with container edges */}
      <div className="bg-primary rounded-t-lg p-4 md:p-6 flex items-center justify-center -mx-4 md:-mx-12 -mt-4 md:-mt-12">
        <div className="flex items-center gap-3 text-white text-center text-xs md:text-base ">
          <span className="whitespace-nowrap">Ihre Vorgangsnummer:</span>
          <span className="font-semibold whitespace-nowrap">
            {data.data.int_process_number || "BRW-2025-839201"}
          </span>
        </div>
      </div>

      <div className="mt-6 mb-6 ">
        <div className="mb-3 flex justify-center">

          <CheckCircle className="text-primary h-12 w-12" />
        </div>
        <div className="text-xl font-semibold text-primary md:text-2xl text-center ">
          {heading}
        </div>
        <div className="mt-2 text-base text-center text-primary">
          {subheading}
        </div>
      </div>

      {/* Pending sections */}
      <div className="my-4 md:my-6 space-y-2">
        <div className="bg-accent rounded-lg p-3 flex items-center justify-center gap-3">
          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
          <span className="text-primary text-xs md:text-base text-center font-medium">
            Bearbeitung durch Sachverständigenabteilung läuft
          </span>
          <Hourglass className="text-primary h-8 w-8" />
        </div>
        <div className="rounded-lg p-3 flex items-center justify-center gap-3 opacity-40">
          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0"></span>
          <span className="text-gray-500 text-xs md:text-base">
            Unterlagen erhalten
          </span>
          <FileText className="text-gray-500 h-5 w-5" />
        </div>
      </div>

      {/* <div className=" mx-auto mt-auto">
        <Image
          width={185}
          src={iconLong}
          alt="Logo Bodenrichtwerte Deutschland - Wide"
        />
      </div> */}
      <div className=" mt-4 mx-auto">
        <Trust />
      </div>
      <div className="mt-4 mx-auto text-center">
        <p className="text-xs text-gray-400">
          Datenquelle: Amtliche Bodenrichtwerte der Gutachterausschüsse (BORIS Deutschland)<br />
          Hinweis: Diese Auskunft ersetzt kein Verkehrswertgutachten nach § 194 BauGB.
        </p>
      </div>
    </>
  );
}
