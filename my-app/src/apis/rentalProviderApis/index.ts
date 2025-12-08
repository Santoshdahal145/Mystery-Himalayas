import { ApiParamsType } from "@/types/common";
import { ConfigType } from "@utils/requestAPI";

export const rentalProviderApis = {
  getSingleRentalProvider: (id: number): ConfigType => {
    return {
      method: "get",
      url: `/rental-provider/${id}`,
    };
  },
  getAllRentalProviders: (params?: ApiParamsType): ConfigType => {
    return {
      method: "get",
      url: `/rental-provider`,
      params,
    };
  },
  createNewRentalProvider: (data: any): ConfigType => {
    return {
      method: "post",
      url: `/rental-provider`,
      data,
      config: {
        showToast: true,
      },
    };
  },
  updateExistingRentalProvider: (id: number, data: any): ConfigType => {
    return {
      method: "put",
      url: `/rental-provider/${id}`,
      data,
      config: {
        showToast: true,
      },
    };
  },
  deleteRentalProvider: (id: number): ConfigType => {
    return {
      method: "delete",
      url: `/rental-provider/${id}`,
      config: {
        showToast: true,
      },
    };
  },
};
