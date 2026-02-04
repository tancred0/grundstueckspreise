"use client";
import { cn } from "@/lib/utils";
import { MainContainer } from "@/components/layout/main-container";
import Link from "next/link";
// import { MainNavDropdown } from "@/components/navigation/main-nav-dropdown";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { NavConfigInterface } from "@/config/nav";

export function MainNavBottom({
  navConfig,
  className,
  ...props
}: {
  navConfig: NavConfigInterface;
  className?: string;
}) {
  return (
    <MainContainer
      className={cn("flex justify-between items-center w-full py-1", className)}
      {...props}
    >
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row space-x-4 xl:space-x-4 justify-between items-center ml-[-12px]">
          {navConfig.mainNav?.map(
            (item) => (
              <Link
                href={item.href}
                key={item.href}
                className="no-underline text-lg p-3 rounded-md hover:bg-secondary"
              >
                {item.title}
              </Link>
            )
            // item.items.length > 0 ? (
            //   <MainNavDropdown className="" key={item.href} dropDownItems={item} />
            // ) : (
            //      <NavLink
            //     key={item.href}
            //     href={item.href}
            //     className="text-primary-foreground text-md font-semibold p-3 rounded-md hover:bg-secondary"
            //   >
            //     {item.title}
            //   </NavLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {/* <div className="hidden relative xl:block">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative">
            <SiteSearch className="md:w-48" />
          </div>
        </div>
      </div> */}
    </MainContainer>
  );
}

// interface NavLinkProps extends LinkProps {
//   children: React.ReactNode;
//   className?: string;
// }

// function NavLink({ href, className, children, ...props }: NavLinkProps) {
//   const router = useRouter();
//   return (
//     <Link
//       href={href}
//       onClick={() => {
//         router.push(href.toString());
//       }}
//       className={cn("no-underline text-base", className)}
//       {...props}
//     >
//       {children}
//     </Link>
//   );
// }
