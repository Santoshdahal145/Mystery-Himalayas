"use client";

import { DataContainer } from "@/components/ui/DataContainer";
import { CustomPagination } from "@/components/ui/DataContainer/Pagination";
import { AdminLayout } from "@/layouts";
import { RentalProviderCard } from "./RentalProviderCard";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/contextProviders/AlertProvider";
import AddEditRentalProvider from "./AddEditRentalProvider";
import { useState } from "react";
import useRentalProviderHook from "@/hooks/tanstack-hooks/useRentalProviderHook";
import { PageLimitType } from "@/types/common";

type AddEditModalState = {
  visible: boolean;
  rentalProviderId: number | undefined;
};

export default function Page() {
  const { showAlert, closeAlert } = useAlert();

  const [pageLimit, setPageLimit] = useState<PageLimitType>({
    limit: 10,
    page: 1,
  });

  const { getProviders, deleteProvider } = useRentalProviderHook();

  const INITIAL_ADD_EDIT_MODAL_STATE: AddEditModalState = {
    visible: false,
    rentalProviderId: undefined,
  };

  const [addEditModalState, setAddEditModalState] = useState<AddEditModalState>(
    INITIAL_ADD_EDIT_MODAL_STATE
  );

  return (
    <div className=" flex flex-col flex-1 p-6 space-y-2">
      {/*ADD EDIT RENTAL PROVIDER MODAL*/}
      {addEditModalState?.visible && (
        <AddEditRentalProvider
          onClose={() => setAddEditModalState(INITIAL_ADD_EDIT_MODAL_STATE)}
          visible={addEditModalState?.visible}
          rentalProviderId={addEditModalState?.rentalProviderId}
        />
      )}
      <AdminLayout.Header
        title="All Rental Providers"
        hasSearchBar
        onChangeSearchBarTxt={(txt) => console.log(txt)}
        rightComponent={
          <Button
            variant="default"
            onClick={() =>
              setAddEditModalState({
                visible: true,
                rentalProviderId: undefined,
              })
            }
          >
            Add Rental Provider
          </Button>
        }
      />
      <DataContainer
        data={getProviders.data?.rentalProviders || []}
        containerClassName="flex flex-wrap gap-2"
        renderItem={(item) => (
          <RentalProviderCard
            key={item.id}
            {...item}
            onDeleteClick={() => {
              showAlert({
                variant: "two buttons",
                btn1Text: "Yes, Delete",
                btn1ClassName: "bg-red-600 hover:bg-red-800",
                onBtn1Click: async () => {
                  await deleteProvider.mutateAsync({ id: item.id });
                },
                title: "Are you sure want to delete this rental provider ?",
                btn2Text: "No, Cancel",
                onBtn2Click: () => closeAlert?.(),
              });
            }}
            onEditClick={() =>
              setAddEditModalState({
                rentalProviderId: item.id,
                visible: true,
              })
            }
          />
        )}
      />
      <CustomPagination
        currentPage={pageLimit.page || 1}
        onPageChange={(p) => setPageLimit((prev) => ({ ...prev, page: p }))}
        totalPages={getProviders.data?.pagination?.totalPages || 1}
        limit={pageLimit.limit}
        onChangeLimit={(l) => setPageLimit((prev) => ({ ...prev, limit: l }))}
      />
    </div>
  );
}
