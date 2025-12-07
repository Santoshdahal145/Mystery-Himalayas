"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/layouts";
import { DASHBOARD_ITEMS } from "./constant";

export default function Page() {
  return (
    <div className="p-6 space-y-2">
      <AdminLayout.Header title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DASHBOARD_ITEMS.map((ditem) => {
          return (
            <Card key={ditem.title}>
              <CardHeader>
                <CardTitle>{ditem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{ditem.count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
