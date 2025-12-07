import { AddressType } from "./common";
import { Pagination } from "./pagination";

export type SingleRentalProvider = {
  id: number;
  logo: string;
  name: string;
  email: string;
  phone: string;
  address: AddressType;
  introduction: string;
};

export type AllRentalProvidersWithPagination = {
  data: SingleRentalProvider[];
  pagination: Pagination;
};
