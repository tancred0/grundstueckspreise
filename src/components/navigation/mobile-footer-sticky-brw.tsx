"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MainContainer } from "../layout/main-container";
// import { SiteSearch } from "@/components/search/site-search";
import Link from "next/link";
import useScrollProgress from "@/hooks/useScrollProgress";

export function MobileFooterStickyBrw({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { scrollProgress } = useScrollProgress();

  return (
    <MainContainer
      className={cn(
        "sm:hidden w-full py-4 border-t bg-slate-50 shadow-md",
        className,
        scrollProgress > 5 && scrollProgress < 90
          ? "fixed bottom-0 z-50 translate-y-0"
          : "fixed bottom-0 z-50 translate-y-full"
      )}
      {...props}
    >
      <div className="flex">
        <Link href="/bewertung">
            <Button size={"lg"} className="w-full py-4">
              Jetzt Bodenrichtwert anfragen
            </Button>
        </Link>
      </div>
    </MainContainer>
  );
}
