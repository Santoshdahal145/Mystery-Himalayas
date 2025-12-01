"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { CORE_ITEMS } from "./constant";
import renderDrawerItem from "./renderDrawerItem";

export function Core() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core</SidebarGroupLabel>
      <SidebarMenu>{renderDrawerItem(CORE_ITEMS)}</SidebarMenu>
    </SidebarGroup>
  );
}
