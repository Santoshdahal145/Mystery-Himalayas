"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { BellIcon } from "lucide-react";
import { ReactElement } from "react";

type WithSearchBarT = {
  hasSearchBar: true;
  onChangeSearchBarTxt: (txt: string) => void;
};

type WithoutSearchBarT = {
  hasSearchBar?: false;
};

type UnionT = WithSearchBarT | WithoutSearchBarT;

type AdminHeaderProps = {
  title: string;
  rightComponent?: ReactElement;
} & UnionT;

export default function Header(props: AdminHeaderProps) {
  return (
    <header className="h-16 w-full border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg">{props.title}</span>
      </div>

      <div className="flex items-center gap-4">
        {props.hasSearchBar && (
          <Input placeholder="Search..." className="w-64 hidden md:block" />
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <BellIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
        {props?.rightComponent}
      </div>
    </header>
  );
}
