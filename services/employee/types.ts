import { Data } from "services/types"

export interface Employee {
  id: string
  name: string
  address: string
  phone_number: string
  entry_date: Date;
  exit_date: Date | null;
  total_saving: number;
}

export interface EmployeeSaving {
  id: string
  date: Date
  type?: string
  total: number
  description: string
  __employee__?: {
    id?: string; 
    name?: string;
  };
}

export type AddEmployee = Omit<Employee, "id">;

export type AddEmployeeSaving = Omit<EmployeeSaving, "id">;

export type EmployeeData = Data<Employee>

export type EmployeeMessage = {
  message: string,
}