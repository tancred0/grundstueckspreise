"use client";

import { cn } from "@/lib/utils";
import { MainContainer } from "@/components/layout/main-container";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LinkProps } from "next/link";
import type { NavConfigInterface } from "@/config/nav";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { useRouter } from "next/navigation";
import brwLogo from "@/images/general/logo_short_black_font.svg";
// import { MobileNavDropdownCollapsile } from "./mobile-nav-dropdown-collapsile";
// import { MobileNavDropdownItem } from "./mobile-nav-dropdown-item";

export function MobileNavTop({
  navConfig,
  className,
  ...props
}: {
  navConfig: NavConfigInterface;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <MainContainer
      className={cn("flex justify-between items-center w-full py-4", className)}
      {...props}
    >
      <Link href="/" className="flex items-center">
        <Image
          className="mr-10 "
          src={brwLogo}
          alt="Logo Immobilienpreise Deutschland"
        />
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex items-center justify-center md:hidden"
          >
            <Menu className="h-6 w-6 text-[#042B59]" />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="pl-0">
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <Image
              className="mr-10 "
              src={brwLogo}
              alt="Logo Immobilienpreise Deutschland"
            />

            <div className="flex flex-col space-y-2">
              {navConfig.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3 pt-6">
                  <Link
                    className="font-bold text-[#042B59] no-underline"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {/* {item?.items?.length &&
                    item.items.map((item) => (
                      <React.Fragment key={item.href}>
                        {item.items.length > 0 ? (
                          <MobileNavDropdownCollapsile dropDownItems={item} onMobileNavOpenChange={setOpen} />
                        ) : (
                          <MobileNavDropdownItem
                            dropDownItem={item}
                            onOpenChange={setOpen}
                            className="text-primary-foreground text-sm font-semibold p-2 rounded-md hover:bg-secondary"
                          />
                        )}
                      </React.Fragment>
                    ))} */}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </MainContainer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
