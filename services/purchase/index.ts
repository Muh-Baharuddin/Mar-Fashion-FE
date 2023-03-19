import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddPurchase, Purchase, PurchaseData, PurchaseMessage } from "./types";

const purchase_url = `${process.env.API_ENDPOINT}/purchase`

export const getPurchases = (params: QueryParamsType) => {
  return api.stateGet<PurchaseData, QueryParamsType>(purchase_url, params);
}

export const postPurchase = (data: AddPurchase) => {
  return api.post<Purchase>(purchase_url, data);
}

export const updatePurchase = (id: string, data: AddPurchase) => {
  return api.patch<PurchaseMessage>(purchase_url + "/" + id, data);
}

export const deletePurchase = (id: string) => {
  return api.remove<PurchaseMessage>(purchase_url + "/" + id);
}
