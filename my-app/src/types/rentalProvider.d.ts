import { AddressType } from "./common";
import { Pagination } from "./pagination";

export type SingleRentalProvider = {
  id: number;
  logo: string;
  name: string;
  email: string;
  phone: string;
  address: Omit<AddressType, "id">;
  introduction: string;
};

export type AllRentalProvidersWithPagination = {
  rentalProviders: SingleRentalProvider[];
  pagination: Pagination;
};
