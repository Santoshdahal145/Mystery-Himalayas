import { AddressType } from "./common";
import { Pagination } from "./pagination";

export type SingleAgency = {
  id: number;
  logo: string;
  name: string;
  email: string;
  phone: string;
  address: AddressType;
  introduction: string;
};

export type AllAgenciesWithPagination = {
  data: SingleAgency[];
  pagination: Pagination;
};
