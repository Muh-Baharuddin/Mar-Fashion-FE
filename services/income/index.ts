import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddIncome, IncomeData, IncomeMessage } from "./types";

export const income_url = `${process.env.API_ENDPOINT}/income`

export const getIncomes = (params: QueryParamsType) => {
  return api.stateGet<IncomeData, QueryParamsType>(income_url, params);
}

export const postIncome = (data: AddIncome) => {
  return api.post<AddIncome>(income_url, data);
}

export const updateIncome = (id: string, data: AddIncome) => {
  return api.patch<IncomeMessage>(income_url + "/" + id, data);
}

export const deleteIncome = (id: string) => {
  return api.remove<IncomeMessage>(income_url + "/" + id);
}
