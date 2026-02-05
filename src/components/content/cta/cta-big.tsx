import Image, { type StaticImageData } from "next/image";
import brwImage from "@/images/cta/cta-immopreise.png";
import mobileImage from "@/images/cta/cta-handybewertung.png"
import { Typography } from "@/components/ui/typography";
import CTA from "./cta-button";

export type CTAImageType = "card" | "phone";

export function CTA_Big({
  title = "Jetzt kostenlos Immobilie bewerten",
  description = "Erhalten Sie eine heute eine professionelle Bewertung Ihrer Immobilie.",
  ctaText = "Kostenlose Bewertung starten",
  imageType = "card",
  pageLink = "/bewertung/bewertung",
  className,
}: {
  title?: string;
  description?: string;
  ctaText?: string;
  pageLink?: string;
  imageType?: CTAImageType;
  className?: string;
}) {
  return (
    <div className={`p-6 lg:p-10 flex flex-col lg:flex-row rounded-2xl bg-accent gap-x-4 justify-center ${className}`}>
       <Typography variant="h4" as="div" className="md:hidden text-center">
        {title}
       </Typography>
        <Image 
          src={imageType === "card" ? (brwImage as StaticImageData) : (mobileImage as StaticImageData)} 
          alt="CTA" 
          className="lg:w-2/5 w-full mx-auto" 
        />
      <div className="flex flex-col justify-center gap-y-2  lg:gap-y-6 w-auto lg:w-1/2  mt-4 ">
       <Typography variant="h4" as="div" className="hidden md:block text-center">
        {title}
       </Typography>
        <Typography variant="p" className="text-center [&:not(:first-child)]:mt-0">
          {description}
        </Typography>
        <CTA ctaText={ctaText}  pageLink={pageLink} />
      </div>
    </div>
  );
}
