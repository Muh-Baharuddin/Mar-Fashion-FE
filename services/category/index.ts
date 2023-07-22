import * as api from "services/api";
import { QueryParamsType } from "services/types";
import { AddCategory, Category, CategoryMessage, DataCategory } from "./types";

export const category_url = `${process.env.API_ENDPOINT}/item/category`

export const getCategorys = (params: QueryParamsType) => {
  return api.stateGet<DataCategory, QueryParamsType>(category_url, params);
}

export const postCategory = (data: AddCategory) => {
  return api.post<Category>(category_url, data);
}

export const updateCategory = (id: string, data: AddCategory) => {
  return api.patch<CategoryMessage>(category_url + "/" + id, data);
}

export const deleteCategory = (id: string) => {
  return api.remove<CategoryMessage>(category_url + "/" + id);
}
