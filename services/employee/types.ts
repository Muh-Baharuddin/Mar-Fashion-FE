import { Data } from "services/types"

export interface Employee {
  id: string
  name: string
  address: string
  phone_number: string
  entry_date: Date;
  exit_date: Date;
  total_saving: number;
}

export type AddEmployee = Omit<Employee, "id">;

export type EmployeeData = Data<Employee>

export type EmployeeMessage = {
  message: string,
}