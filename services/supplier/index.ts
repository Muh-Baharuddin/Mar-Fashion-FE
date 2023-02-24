import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddSupplier, Supplier, SupplierData, SupplierMessage } from "./types";

const supplier_url = `${process.env.API_ENDPOINT}/supplier`

export const getSuppliers = (params: QueryParamsType) => {
  return api.get<SupplierData>(supplier_url, params);
}

export const postSupplier = (data: AddSupplier) => {
  return api.post<Supplier>(supplier_url, data);
}

export const updateSupplier = (id: string, data: AddSupplier) => {
  return api.patch<SupplierMessage>(supplier_url + "/" + id, data);
}

export const deleteSupplier = (id: string) => {
  return api.remove<SupplierMessage>(supplier_url + "/" + id);
}
