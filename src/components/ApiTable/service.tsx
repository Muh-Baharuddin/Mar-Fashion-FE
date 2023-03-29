import * as api from "../../../services/api";
import { Data, QueryParamsType } from "../../../services/types";

export const getData = <T extends unknown>(url: string, params: QueryParamsType ) => {
  return api.stateGet<Data<T>, QueryParamsType>(url, params);
}