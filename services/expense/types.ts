import { Data } from "services/types"

export interface Expense {
  id: string;
  date: Date;
  total: number;
  description: string;
}

export type AddExpense = Omit<Expense, "id">;

export type ExpenseData = Data<Expense>

export type ExpenseMessage = {
  message: string,
}