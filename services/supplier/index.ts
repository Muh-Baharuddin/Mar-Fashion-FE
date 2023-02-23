import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { SupplierData } from "./types";

const supplier_url = `${process.env.API_ENDPOINT}/supplier`

export const getSuppliers = (params: QueryParamsType) => {
  return api.get<SupplierData>(supplier_url, params);
}

export const postSupplier = (data: SupplierData) => {
  return api.post<SupplierData>(supplier_url, data);
}

export const updateSupplier = (params: string, data: SupplierData) => {
  return api.patch<SupplierData>(supplier_url + "/" + params, data);
}

export const deleteSupplier = (params: string) => {
  return api.remove(supplier_url + "/" + params);
}
