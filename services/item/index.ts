import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddItem, Item, ItemData, ItemMessage } from "./types";

export const item_url = `${process.env.API_ENDPOINT}/item`

export const getItems = (params: QueryParamsType) => {
  return api.stateGet<ItemData, QueryParamsType>(item_url, params);
}

export const postItem = (data: AddItem) => {
  return api.post<Item>(item_url, data);
}

export const updateItem = (id: string, data: AddItem) => {
  return api.patch<ItemMessage>(item_url + "/" + id, data);
}

export const deleteItem = (id: string) => {
  return api.remove<ItemMessage>(item_url + "/" + id);
}
