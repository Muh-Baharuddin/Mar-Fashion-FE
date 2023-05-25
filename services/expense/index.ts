import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddExpense, ExpenseData, ExpenseMessage } from "./types";

export const expense_url = `${process.env.API_ENDPOINT}/expenses`

export const getExpenses = (params: QueryParamsType) => {
  return api.stateGet<ExpenseData, QueryParamsType>(expense_url, params);
}

export const postExpense = (data: AddExpense) => {
  return api.post<AddExpense>(expense_url, data);
}

export const updateExpense = (id: string, data: AddExpense) => {
  return api.patch<ExpenseMessage>(expense_url + "/" + id, data);
}

export const deleteExpense = (id: string) => {
  return api.remove<ExpenseMessage>(expense_url + "/" + id);
}
