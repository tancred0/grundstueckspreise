"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MainContainer } from "../layout/main-container";
import useScrollProgress from "@/hooks/useScrollProgress";
import Link from "next/link";

export function MobileFooterStickyBewertung({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { scrollProgress, scrollPosition } = useScrollProgress();

  return (
    <MainContainer
      className={cn(
        "sm:hidden w-full py-4 border-t bg-slate-50 shadow-md",
        className,
        scrollPosition > 500 && scrollProgress < 90
          ? "fixed bottom-0 z-50 translate-y-0"
          : "fixed bottom-0 z-50 translate-y-full"
      )}
      {...props}
    >
      <div className="w-full">
        <Link href="/bewertung/bewertung" className="w-full block">
          <Button size={"lg"} className="w-full py-4">
            Jetzt kostenlos Immobilie bewerten
          </Button>
        </Link>
      </div>

      {/* <SiteSearch className="w-full sm:w-48" /> */}
    </MainContainer>
  );
}
