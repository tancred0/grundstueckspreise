import { NavigationCta, NavigationItem } from "@/types/nav";

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
    // {
    //   title: "Immobilienpreise",
    //   href: "/immobilienpreise",
    //   items: [],
    // // },
    // {
    //   title: "Immobilienwissen",
    //   href: "/immobilienwissen",
    //   items: [],
    // },
    // {
    //   title: "Gutachterausschüsse",
    //   href: "/gutachterausschuss",
    //   items: [],
    // },
    // {
    //   title: "Grundbuchämter",
    //   href: "/grundbuchamt",
    //   items: [],
    // },
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
    // {
    //   title: "Immobilienpreise",
    //   href: "/immobilienpreise",
    //   items: [],
    // },
    // {
    //   title: "Immobilienwissen",
    //   href: "/immobilienwissen",
    // },
    // {
    //   title: "Gutachterausschüsse",
    //   href: "/gutachterausschuss",
    //   items: [],
    // },
    // {
    //   title: "Grundbuchämter",
    //   href: "/grundbuchamt",
    // },
  ],
  hideBottomNav: [
    "lp",
    "checkout",
    "bewertung",
  ],
  showCta: {
    "": "bewertung",
    // "bodenrichtwert": "brw",
    // "boris": "brw",
    // "grundsteuer": "brw",
    // "grundbuchamt": "brw",
    // "gutachterausschuss": "brw",
    
    "lp": null,
    "checkout": null,
    "bewertung": null,
    
    "immobilienpreise": "bewertung",
    "immobilienwissen": "bewertung",
  }
};