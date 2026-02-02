import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";

import { navConfigHardcoded } from "@/config/nav";
import type { NavConfigInterface } from "@/config/nav";

// async function createNavigationStructure(): Promise<NavConfigInterface> {
//   // const topCategories = await sanityFetchTopCategories();

//   const mainNav: NavigationItem[] = [];
//   const sidebarNav: NavigationItem[] = [];

//   for (const topCategory of topCategories) {
//     const mainCategories = await sanityFetchMainCategories(topCategory._id);

//     const mainCategoryItems: NavigationItem[] = [];

//     mainCategoryItems.push({
//       title: topCategory.titleDropdown,
//       href: `/${topCategory.blog.slug.current}`,
//       items: [],
//       icon:
//         topCategory.icon === undefined
//           ? undefined
//           : urlForImage(topCategory.icon),
//     });

//     for (const mainCategory of mainCategories) {
//       const subCategories = await sanityFetchSubCategories(mainCategory._id);

//       const subCategoryItems = subCategories.map((subCategory) => ({
//         title: subCategory.blog?.breadcrumbTitle,
//         href: `/${topCategory.blog.slug.current}/${mainCategory.blog.slug.current}/${subCategory.blog.slug.current}`,
//         items: [],
//       }));

//       if (subCategories.length > 0) {
//         subCategoryItems.unshift({
//           title:
//             `${mainCategory.blog?.breadcrumbTitle} Überblick`,
//           href: `/${topCategory.blog.slug.current}/${mainCategory.blog.slug.current}`,
//           items: [],
//         });
//       }

//       mainCategoryItems.push({
//         title:
//           mainCategory.blog?.breadcrumbTitle,
//         href: `/${topCategory.blog.slug.current}/${mainCategory.blog.slug.current}`,
//         items: subCategoryItems,
//         icon:
//           mainCategory.icon === undefined
//             ? undefined
//             : urlForImage(mainCategory.icon),
//       });
//     }

//     const topCategoryItem: NavigationItem = {
//       title: topCategory.title,
//       href: `/${topCategory.blog.slug.current}`,
//       items: mainCategoryItems,
//     };

//     mainNav.push(topCategoryItem);
//     sidebarNav.push(topCategoryItem);
//   }

//   const navigationStructure: NavConfigInterface = {
//     mainNav,
//     sidebarNav,
//   };

//   return navigationStructure;
// }

export async function SiteHeader() {
  // const navConfigDynamic = await createNavigationStructure();

  // Add the other navigation items that are not part of the Sanity structure
  const navConfig: NavConfigInterface = {
    mainNav: [
      // ...navConfigDynamic.mainNav,
      ...navConfigHardcoded.mainNav,
    ],
    sidebarNav: [
      // ...navConfigDynamic.sidebarNav,
      ...navConfigHardcoded.sidebarNav,
    ],
    showCta: navConfigHardcoded.showCta,
    hideBottomNav: navConfigHardcoded.hideBottomNav,
  };

  return (
    <header className="top-0 sticky z-50 w-full border-border/40 bg-background backdrop-blur">
      <MainNav navConfig={navConfig} />
      <MobileNav navConfig={navConfig} />
    </header>
  );
}
