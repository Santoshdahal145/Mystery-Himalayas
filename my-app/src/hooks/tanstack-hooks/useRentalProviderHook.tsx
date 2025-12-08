import { rentalProviderApis } from "@apis/index";
import { requestAPI } from "@utils/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AllRentalProvidersWithPagination,
  SingleRentalProvider,
} from "@/types/rentalProvider";

export type CreateRentalProviderPayload = Omit<
  SingleRentalProvider,
  "id" | "logo"
> & {
  logo: File | string;
};

export type UpdateRentalProviderPayload = {
  id: number;
  data: Partial<
    Omit<SingleRentalProvider, "id" | "logo"> & {
      logo: File | string;
    }
  >;
};

export const enum RENTAL_PROVIDER_KEYS {
  create = "create-rental-provider",
  update = "update-rental-provider",
  getAll = "all-rental-providers",
  getSingle = "single-rental-provider",
  delete = "delete-rental-provider",
}

export default function useRentalProviderHook(page = 1, limit = 10) {
  const queryClient = useQueryClient();

  // GET ALL (with pagination)
  const getProviders = useQuery({
    queryKey: [RENTAL_PROVIDER_KEYS.getAll, page, limit],
    queryFn: async () => {
      return (await requestAPI(
        rentalProviderApis.getAllRentalProviders({ page, limit })
      )) as AllRentalProvidersWithPagination;
    },
  });

  // CREATE
  const createProvider = useMutation({
    mutationKey: [RENTAL_PROVIDER_KEYS.create],
    mutationFn: async (payload: CreateRentalProviderPayload) => {
      return (await requestAPI(
        rentalProviderApis.createNewRentalProvider(payload)
      )) as SingleRentalProvider;
    },

    onSuccess: (newProvider) => {
      queryClient.setQueryData(
        [RENTAL_PROVIDER_KEYS.getAll, page, limit],
        (oldData: AllRentalProvidersWithPagination | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: [newProvider, ...oldData.data], // prepend new item
            pagination: {
              ...oldData.pagination,
              total: oldData.pagination.total + 1,
            },
          };
        }
      );
    },
  });

  // UPDATE
  const updateProvider = useMutation({
    mutationKey: [RENTAL_PROVIDER_KEYS.update],
    mutationFn: async ({ id, data }: UpdateRentalProviderPayload) => {
      return (await requestAPI(
        rentalProviderApis.updateExistingRentalProvider(id, data)
      )) as SingleRentalProvider;
    },

    onSuccess: (updatedItem) => {
      queryClient.setQueryData(
        [RENTAL_PROVIDER_KEYS.getAll, page, limit],
        (oldData: AllRentalProvidersWithPagination | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: oldData.data.map((p) =>
              p.id === updatedItem.id ? updatedItem : p
            ),
          };
        }
      );
    },
  });

  // DELETE
  const deleteProvider = useMutation({
    mutationKey: [RENTAL_PROVIDER_KEYS.delete],
    mutationFn: async ({ id }: { id: number }) => {
      return await requestAPI(rentalProviderApis.deleteRentalProvider(id));
    },

    onSuccess: (_, { id }) => {
      queryClient.setQueryData(
        [RENTAL_PROVIDER_KEYS.getAll, page, limit],
        (oldData: AllRentalProvidersWithPagination | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: oldData.data.filter((p) => p.id !== id),
            pagination: {
              ...oldData.pagination,
              total: oldData.pagination.total - 1,
            },
          };
        }
      );
    },
  });

  return {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider,
  };
}
