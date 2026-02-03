import { MobileFooterStickyBewertung } from "@/components/navigation/mobile-footer-sticky-bewertung";

export default function ImmopreiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <MobileFooterStickyBewertung />
    </>
  );
}
