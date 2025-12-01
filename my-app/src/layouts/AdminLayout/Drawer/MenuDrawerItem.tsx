"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MoreHorizontal } from "lucide-react";
import { MenuItemType } from "./types";

export default function MenuDrawerItem({
  icon,
  menuItems,
  name,
  url,
}: MenuItemType) {
  const { isMobile } = useSidebar();
  const IconComponent = icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={url}>
          <IconComponent />
          <span>{name}</span>
        </a>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          {menuItems.map((menu) => {
            return (
              <a key={menu.name} href={menu.url}>
                <DropdownMenuItem>
                  <menu.icon className="text-muted-foreground" />
                  <span>{menu.name}</span>
                </DropdownMenuItem>
              </a>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
