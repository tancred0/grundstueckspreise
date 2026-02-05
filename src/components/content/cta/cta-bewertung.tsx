import { CTA_Big, type CTAImageType } from "./cta-big";

type CTAVariant = "professional" | "speed" | "local";

const ctaVariants: Record<CTAVariant, (locationName: string) => { title: string; description: string; ctaText: string, imageType: CTAImageType }> = {
  professional: (locationName) => ({
    title: `Kostenlose Immobilienbewertung für ${locationName}`,
    description: `Ermitteln Sie den aktuellen Marktwert Ihrer Immobilie in ${locationName}.`,
    ctaText: "Kostenlose Bewertung starten",
    imageType: "card"
  }),
  speed: (locationName) => ({
    title: "Immobilienwert in 3 Minuten ermitteln",
    description: `Kostenlose Erstbewertung auf Basis aktueller Daten aus ${locationName}.`,
    ctaText: "Jetzt Wert ermitteln",
    imageType: "phone"
  }),
  local: (locationName) => ({
    title: `Kostenlose Immobilienbewertung für ${locationName}`,
    description: "Professionelle Marktwerteinschätzung basierend auf lokalen Vergleichsdaten.",
    ctaText: "Kostenlose Bewertung starten",
    imageType: "card"
  }),
};

export function CTA_BewertungVariant({
  locationName,
  variant,
  pageLink,
  className,
}: {
  locationName: string;
  variant: CTAVariant;
  pageLink?: string;
  className?: string;
}) {
  const { title, description, ctaText, imageType } = ctaVariants[variant](locationName);
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
