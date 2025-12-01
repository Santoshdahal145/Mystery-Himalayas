"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { BellIcon } from "lucide-react";

type AdminHeaderProps = {
  title: string;
  onChangeSearchBarTxt: (txt: string) => void;
};

export default function Header() {
  return (
    <header className="h-16 w-full border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg">Admin Panel</span>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-64 hidden md:block" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <BellIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
