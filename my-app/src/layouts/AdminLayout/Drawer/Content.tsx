"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import renderDrawerItem from "./renderDrawerItem";
import { CONTENT_ITEMS } from "./constant";

export function Content() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarMenu>{renderDrawerItem(CONTENT_ITEMS)}</SidebarMenu>
    </SidebarGroup>
  );
}
