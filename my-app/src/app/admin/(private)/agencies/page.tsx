"use client";

import { DataContainer } from "@/components/ui/DataContainer";
import { CustomPagination } from "@/components/ui/DataContainer/Pagination";
import { AdminLayout } from "@/layouts";
import { DUMMY_AGENCIES } from "./constant";
import { AgencyCard } from "./AgencyCard";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className=" flex flex-col flex-1 p-6 space-y-2">
      <AdminLayout.Header
        title="All Agencies"
        hasSearchBar
        onChangeSearchBarTxt={(txt) => console.log(txt)}
        rightComponent={
          <Button variant="default" onClick={() => {}}>
            Add Agency
          </Button>
        }
      />
      <DataContainer
        data={DUMMY_AGENCIES}
        containerClassName="flex flex-wrap gap-2"
        renderItem={(item) => (
          <AgencyCard
            key={item.id}
            {...item}
            onDeleteClick={() => {}}
            onEditClick={() => {}}
          />
        )}
      />
      <CustomPagination
        currentPage={1}
        onPageChange={(p) => {}}
        totalPages={10}
      />
    </div>
  );
}
