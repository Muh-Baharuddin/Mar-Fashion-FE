import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { SupplierData } from "./types";

export const getSuppliers = (params: QueryParamsType) => {
  return api.get<SupplierData>(`${process.env.API_ENDPOINT}supplier`, params);
}

export const postSupplier = (data: SupplierData) => {
  return api.post<SupplierData>(`${process.env.API_ENDPOINT}supplier`, data);
}
