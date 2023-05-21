import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddSale, Sale, SaleData, SaleMessage } from "./types";

export const sale_url = `${process.env.API_ENDPOINT}/sale`

export const getSales = (params: QueryParamsType) => {
  return api.stateGet<SaleData, QueryParamsType>(sale_url, params);
}

export const postSale = (data: AddSale) => {
  return api.post<Sale>(sale_url, data);
}

export const updateSale = (id: string, data: AddSale) => {
  return api.patch<SaleMessage>(sale_url + "/" + id, data);
}

export const deleteSale = (id: string) => {
  return api.remove<SaleMessage>(sale_url + "/" + id);
}
