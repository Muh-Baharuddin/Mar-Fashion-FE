import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddStoreLocation, StoreLocationData, StoreLocationMessage } from "./types";

export const storeLocation_url = `${process.env.API_ENDPOINT}/store-location`

export const getStoreLocations = (params: QueryParamsType) => {
  return api.stateGet<StoreLocationData, QueryParamsType>(storeLocation_url, params);
}

export const postStoreLocation = (data: AddStoreLocation) => {
  return api.post<AddStoreLocation>(storeLocation_url, data);
}

export const updateStoreLocation = (id: string, data: AddStoreLocation) => {
  return api.patch<StoreLocationMessage>(storeLocation_url + "/" + id, data);
}

export const deleteStoreLocation = (id: string) => {
  return api.remove<StoreLocationMessage>(storeLocation_url + "/" + id);
}
