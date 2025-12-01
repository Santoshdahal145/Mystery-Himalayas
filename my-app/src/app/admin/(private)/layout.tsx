import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminLayout } from "@layouts/index";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-row flex-1">
        <AdminLayout.Drawer />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </SidebarProvider>
  );
}
