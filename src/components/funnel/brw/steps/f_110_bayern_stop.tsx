import CTA from "@/components/content/cta/cta-button";
import { Trust } from "../../trust";

export default function BayernStopScreen() {
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {/* Heading at the top */}
        <div className="text-center pt-8">
          <div className="text-2xl font-bold text-primary md:text-3xl text-center">
            Leider stellt der der Freistaat Bayern die Bodenrichtwerte nicht gratis zur Verfügung.
          </div>
        </div>

        {/* Centered content */}
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-center">
            Den Link zum offiziellen Portal für Bodenrichtwerte finden Sie hier.
          </p>
          <CTA
            pageLink="https://www.bodenrichtwerte.bayern.de"
            ctaText={`BORIS Bayern`}
          />
        </div>

        {/* Logo and trust icons at the bottom */}
        <div className="pb-8">
          {/* <div className="mb-6">
            <Image
              width={185}
              className="mx-auto"
              src={iconLong}
              alt="Logo Bodenrichtwerte Deutschland - Wide"
            />
          </div> */}
          <div className="mx-auto">
            <Trust />
          </div>
        </div>
      </div>
    </>
  );
}
