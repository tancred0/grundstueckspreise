import { cn } from "@/lib/utils";
import { MainContainer } from "@/components/layout/main-container";
import { Button } from "@/components/ui/button";
import { MapPin, PinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import brwLogo from "@/images/general/logo_short_black_font.svg";
import { type  NavigationCtaType } from "@/types/nav";

export function MainNavTop({
  className,
  hideBottomNav,
  showFunnel,
  ...props
}: React.HTMLAttributes<HTMLElement> & { hideBottomNav?: boolean, showFunnel?: NavigationCtaType }) {
  
  return (
    <MainContainer
      className={cn("flex justify-between items-center w-full py-1", className)}
      {...props}
    >
      <Link href="/">
        <Image
          className="mr-10 "
          src={brwLogo}
          alt="Logo Immobilienpreise Deutschland"
          height={64}
        />
      </Link>

      {!hideBottomNav && (
        <>
        {showFunnel === "brw" && (
          <div className={cn("flex items-center", hideBottomNav ? "hidden" : "")}>
          <Button size="navBar" asChild>
            <Link href="/bewertung" className="no-underline">
              Bodenrichtwert anfragen
            </Link>
          </Button>
        </div>
      )}
      {showFunnel === "bewertung" && (
        <div className={cn("flex items-center", hideBottomNav ? "hidden" : "")}>
          <Button size="navBar" asChild>
            <Link href="/bewertung/bewertung" className="no-underline">
              Immobilienwert anfragen
            </Link>
          </Button>
        </div>
      )}
      </>
      )}
    </MainContainer>
  );
}
