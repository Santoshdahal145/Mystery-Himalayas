import { LucideIcon } from "lucide-react";

export type CollapsibleItemType = {
  type: "collapsible";
  name: string;
  icon: LucideIcon;
  isActive: boolean;
  items: {
    name: string;
    url: string;
  }[];
};

export type MenuItemType = {
  type: "menu";
  name: string;
  url: string;
  icon: LucideIcon;
  isActive: boolean;
  menuItems: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
};

export type NormalItemType = {
  type: "normal";
  icon: LucideIcon;
  name: string;
  url: string;
};

export type CombinedCollapseMenuType =
  | MenuItemType
  | CollapsibleItemType
  | NormalItemType;
