"use client";

import { DataContainer } from "@/components/ui/DataContainer";
import { CustomPagination } from "@/components/ui/DataContainer/Pagination";
import { AdminLayout } from "@/layouts";
import { DUMMY_RENTAL_PROVIDERS } from "./constant";
import { RentalProviderCard } from "./RentalProviderCard";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/contextProviders/AlertProvider";
import AddEditRentalProvider from "./AddEditRentalProvider";
import { useState } from "react";

type AddEditModalState = {
  visible: boolean;
  rentalProviderId: number | undefined;
};

export default function Page() {
  const { showAlert, closeAlert } = useAlert();

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
        data={DUMMY_RENTAL_PROVIDERS}
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
                onBtn1Click: () => {},
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
        currentPage={1}
        onPageChange={(p) => {}}
        totalPages={10}
      />
    </div>
  );
}
