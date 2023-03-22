import { Data } from "services/types"

export interface Supplier {
  id: string;
  name: string;
  address: string;
  city: string;
  phone_number: string;
  account_number: string;
  account_owner: string;
  bank: string;
  __items__: Array<{
    brand: string;
    capital_price?: number;
  }>
}

export type AddSupplier = Omit<Supplier, "id">;

export type SupplierData = Data<Supplier>

export type SupplierMessage = {
  message: string,
}