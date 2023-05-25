import { Data } from "services/types"

export interface Income {
  id: string;
  date: Date;
  total: number;
  description: string;
}

export type AddIncome = Omit<Income, "id">;

export type IncomeData = Data<Income>

export type IncomeMessage = {
  message: string,
}