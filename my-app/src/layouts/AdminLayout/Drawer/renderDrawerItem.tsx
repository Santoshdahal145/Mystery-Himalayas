import React from "react";
import { CombinedCollapseMenuType, NormalItemType } from "./types";
import CollapsibleDrawerItem from "./CollapsibleDrawerItem";
import MenuDrawerItem from "./MenuDrawerItem";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function renderDrawerItem(items: CombinedCollapseMenuType[]) {
  return (
    <>
      {items.map((citem, index) => {
        if (citem.type === "collapsible") {
          return <CollapsibleDrawerItem key={index} {...citem} />;
        } else if (citem.type === "menu") {
          return <MenuDrawerItem key={index} {...citem} />;
        } else {
          return <NormalDrawerItem key={index} {...citem} />;
        }
      })}
    </>
  );
}

const NormalDrawerItem: React.FC<NormalItemType> = ({ icon, name, url }) => {
  const IconComponent = icon;
  return (
    <SidebarMenuButton asChild>
      <a href={url}>
        <IconComponent />
        <span>{name}</span>
      </a>
    </SidebarMenuButton>
  );
};
