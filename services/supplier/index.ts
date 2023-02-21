import * as api from "services/api";
import { QueryParamsType } from "src/@types/user";
import { Data, Supplier } from "./types";

export const post = (data: Supplier) => {
  return api.post<Data>(`${process.env.API_ENDPOINT}supplier`, data);
}
