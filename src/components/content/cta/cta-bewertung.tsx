import { CTA_Big, type CTAImageType } from "./cta-big";

type CTAVariant = "professional" | "speed" | "local";

const ctaVariants: Record<CTAVariant, (locationName: string, cityName: string) => { title: string; description: string; ctaText: string, imageType: CTAImageType }> = {
  professional: (locationName, cityName) => ({
    title: `Kostenlose Immobilienbewertung für ${locationName}`,
    description: `Ermitteln Sie den aktuellen Marktwert Ihrer Immobilie in ${cityName}.`,
    ctaText: "Kostenlose Bewertung starten",
    imageType: "card"
  }),
  speed: (locationName) => ({
    title: "Immobilienwert in 3 Minuten ermitteln",
    description: `Kostenlose Erstbewertung auf Basis aktueller Daten aus ${locationName}.`,
    ctaText: "Jetzt Wert ermitteln",
    imageType: "phone"
  }),
  local: (locationName, cityName) => ({
    title: `Kostenlose Immobilienbewertung für ${cityName}`,
    description: "Professionelle Marktwerteinschätzung basierend auf lokalen Vergleichsdaten.",
    ctaText: "Kostenlose Bewertung starten",
    imageType: "card"
  }),
};

export function CTA_BewertungVariant({
  locationName,
  cityName,
  variant,
  pageLink,
  className,
}: {
  locationName: string;
  cityName: string;
  variant: CTAVariant;
  pageLink?: string;
  className?: string;
}) {
  const { title, description, ctaText, imageType } = ctaVariants[variant](locationName, cityName);
  return (
    <CTA_Big
      title={title}
      description={description}
      ctaText={ctaText}
      pageLink={pageLink}
      className={className}
      imageType={imageType}
    />
  );
}
