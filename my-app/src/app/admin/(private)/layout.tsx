import { AdminLayout } from "@layouts/index";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-row ">
        <AdminLayout.Drawer />
        <div>
          <AdminLayout.Header />
          <div>
            <SidebarTrigger />
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
