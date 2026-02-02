"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MainContainer } from "../layout/main-container";
import useScrollProgress from "@/hooks/useScrollProgress";
import {
  Dialog,
  DialogContent, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { BewertungsFunnel } from "../funnel/bewertung/bewertung-funnel";
import Image from "next/image";
import brwLogo from "@/images/general/logo_small.svg";
import Link from "next/link";

export function MobileFooterStickyBewertung({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { scrollProgress, isScrollingUp } = useScrollProgress();

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
        <Dialog>
          <DialogTrigger asChild>
            <Link href="/bewertung/bewertung">
            <Button size={"lg"} className="w-full py-4">
              Jetzt kostenlos Immobilie bewerten
            </Button>
            </Link>
          </DialogTrigger>
          <DialogContent className="bg-white h-full w-full flex-none">
            <div className="flex flex-col gap-2">
            <div className="flex gap-2 border-b border-gray-200 ">

              <Image
                src={brwLogo}
                alt="Logo Immobilienpreise Deutschland"
                className="mb-4"
              />
              <div className="w-full border-b border-gray-200">
              </div>
              </div>
            </div>
            <DialogTitle className="hidden"></DialogTitle>
            {/* <BewertungsFunnelModal /> */}

          </DialogContent>
        </Dialog>
      </div>

      {/* <SiteSearch className="w-full sm:w-48" /> */}
    </MainContainer>
  );
}
