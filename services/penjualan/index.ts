import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddPenjualan, Penjualan, PenjualanData, PenjualanMessage } from "./types";

const penjualan_url = `${process.env.API_ENDPOINT}/penjualan`

export const getPenjualan = (params: QueryParamsType) => {
  return api.stateGet<PenjualanData, QueryParamsType>(penjualan_url, params);
}

export const postSupplier = (data: AddPenjualan) => {
  return api.post<Penjualan>(penjualan_url, data);
}

export const updateSupplier = (id: string, data: AddPenjualan) => {
  return api.patch<PenjualanMessage>(penjualan_url + "/" + id, data);
}

export const deleteSupplier = (id: string) => {
  return api.remove<PenjualanMessage>(penjualan_url + "/" + id);
}
