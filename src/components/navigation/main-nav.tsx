"use client";

import { cn } from "@/lib/utils";
import { MainNavTop } from "@/components/navigation/main-nav-top";
import { MainNavBottom } from "@/components/navigation/main-nav-bottom";
import { NavConfigInterface } from "@/config/nav";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  navConfig,
  ...props
}: {
  className?: string;
  navConfig: NavConfigInterface;
}) {
  // get current pathname in cleint mode
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const showFunnel = navConfig.showCta[path] ?? "bewertung";
  const hideBottomNav = navConfig.hideBottomNav.includes(path);


  return (
    <nav
      className={cn(
        "hidden sm:flex flex-col w-full bg-slate-50",
        className
      )}
      {...props}
    >
      <div className="w-full border-b">
        <MainNavTop hideBottomNav={hideBottomNav} showFunnel={showFunnel}/>
      </div>
      {/* Bottom nav hidden for now */}
      {/* {!hideBottomNav && (
        <div className="w-full border-b bg-slate-50">
          <MainNavBottom navConfig={navConfig} />
        </div>
      )} */}
    </nav>
  );
}
