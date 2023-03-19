import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddEmployee, Employee, EmployeeData, EmployeeMessage } from "./types";

const employee_url = `${process.env.API_ENDPOINT}/employee`

export const getEmployees = (params: QueryParamsType) => {
  return api.stateGet<EmployeeData, QueryParamsType>(employee_url, params);
}

export const postEmployee = (data: AddEmployee) => {
  return api.post<Employee>(employee_url, data);
}

export const updateEmployee = (id: string, data: AddEmployee) => {
  return api.patch<EmployeeMessage>(employee_url + "/" + id, data);
}

export const deleteEmployee = (id: string) => {
  return api.remove<EmployeeMessage>(employee_url + "/" + id);
}
