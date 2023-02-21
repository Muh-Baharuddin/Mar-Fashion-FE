import * as api from "services/api";
import { QueryParamsType } from "src/@types/user";
import { Data } from "./types";

export const getAll = (params: QueryParamsType) => {
  return api.get<Data>(`${process.env.API_ENDPOINT}supplier`, params);
}
