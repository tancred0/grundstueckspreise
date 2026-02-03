"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MobileNavTop } from "@/components/navigation/mobile-nav-top";
import { NavConfigInterface } from "@/config/nav";

export function MobileNav({
  navConfig,
  className,
  ...props
}: {
  navConfig: NavConfigInterface,
  className?: string;
}) {

  return (
    <nav className={cn("flex sm:hidden flex-col w-full bg-slate-50", className)} {...props}>
      <div className="w-full border-b">
        <MobileNavTop navConfig={navConfig} />
      </div>
    </nav>
  );
}