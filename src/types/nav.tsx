export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string 
  // | keyof typeof Icons;
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface NavigationItem extends NavItemWithChildren {}

export type NavigationCtaType = "brw" | "bewertung" | null;

export interface NavigationCta {
  [key: string]: NavigationCtaType;
}