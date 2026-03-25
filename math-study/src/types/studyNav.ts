export interface NavItemLink {
  id: string;
  label: string;
  href: string;
  comingSoon?: false;
  isSectionHeader?: false;
}

export interface NavItemPlaceholder {
  id: string;
  label: string;
  href: null;
  comingSoon: true;
  isSectionHeader?: false;
}

export interface NavItemSectionHeader {
  id: string;
  label: string;
  isSectionHeader: true;
}

export type NavItem = NavItemLink | NavItemPlaceholder | NavItemSectionHeader;

export function isNavSectionHeader(item: NavItem): item is NavItemSectionHeader {
  return 'isSectionHeader' in item && item.isSectionHeader === true;
}

export interface NavCategory {
  id: string;
  label: string;
  expanded: boolean;
  items: NavItem[];
}
