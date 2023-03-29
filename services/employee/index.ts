import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddEmployee, AddEmployeeSaving, Employee, EmployeeData, EmployeeMessage } from "./types";

export const employee_url = `${process.env.API_ENDPOINT}/employee`
export const employeeSaving_url = `${process.env.API_ENDPOINT}/employee-saving`

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

export const getEmployeeSaving = (params: QueryParamsType) => {
  return api.stateGet<EmployeeData, QueryParamsType>(employeeSaving_url, params);
}

export const postEmployeeSaving = (data: AddEmployeeSaving) => {
  return api.post<Employee>(employeeSaving_url, data);
}

export const updateEmployeeSaving = (id: string, data: AddEmployeeSaving) => {
  return api.patch<EmployeeMessage>(employeeSaving_url + "/" + id, data);
}

export const deleteEmployeeSaving = (id: string) => {
  return api.remove<EmployeeMessage>(employeeSaving_url + "/" + id);
}
