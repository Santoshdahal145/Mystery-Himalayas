"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { BellIcon, UserIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 w-full border-b px-4 flex items-center justify-between bg-background">
      {/* Left side: sidebar toggle + branding + search */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          {/* You can use SidebarTrigger icon here */}
          <UserIcon />
        </Button>
        <span className="font-bold text-lg">Admin Panel</span>
        <Input placeholder="Search..." className="w-64 hidden md:block" />
      </div>

      {/* Right side: notifications + profile */}
      <div className="flex items-center gap-4">
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
