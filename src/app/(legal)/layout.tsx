import Footer from "@/components/layout/Footer";
import { MainContainer } from "@/components/layout/main-container";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
