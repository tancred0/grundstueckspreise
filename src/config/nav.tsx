import type { NavigationCta, NavigationItem } from "@/types/nav";

export interface NavConfigInterface {
  mainNav: NavigationItem[];
  sidebarNav: NavigationItem[];
  hideBottomNav: string[];
  showCta: NavigationCta
}

export const navConfigHardcoded: NavConfigInterface = {
  mainNav: [
    {
      title: "Immobilienpreise",
      href: "/",
      items: [],
    },
   
  ],
  sidebarNav: [
    {
      title: "Immobilienpreise",
      href: "/",
      // items: [
      //   {
      //     title: "Venenarzt Finden",
      //     href: "/venenarzt-finden",
      //     items: [],
      //   },
      //   {
      //     title: "Ratgeber",
      //     href: "/ratgeber",
      //     items: [],
      //   },
      //   {
      //     title: "Über uns",
      //     href: "/ueber-uns",
      //     items: [],
      //   },
      // ],
    },
  ],
  hideBottomNav: [
    "lp",
    "checkout",
    "bewertung",
  ],
  showCta: {
    // Exclusion list - paths where the CTA button should NOT show
    "bewertung": null,
    "impressum": null,
    "datenschutz": null,
  }
};