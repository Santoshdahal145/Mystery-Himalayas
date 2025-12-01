import { MysteryHimalayaSVG } from "@/assets";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Header() {
  const { open } = useSidebar();
  return (
    <div className="flex items-center justify-between gap-1 py-3">
      {open && (
        <div className="flex items-center">
          <Image src={MysteryHimalayaSVG} height={80} width={50} alt="MH" />
          <div className="flex flex-col ">
            <span className="font-semibold text-sm">Mystery Himalaya</span>
            <span className="font-light text-xs">Travel App</span>
          </div>
        </div>
      )}
      <SidebarTrigger />
    </div>
  );
}
