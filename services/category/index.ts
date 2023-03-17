import * as api from "services/api";
import { QueryParamsType } from "services/types";
import { DataCategory } from "./types";

const category_url = `${process.env.API_ENDPOINT}/item/category`

// export const getCategorys = () => {
//   return api.get<DataCategory>(category_url);
// }

export const getCategorys = (params: QueryParamsType) => {
  return api.stateGet<DataCategory, QueryParamsType>(category_url, params);
}