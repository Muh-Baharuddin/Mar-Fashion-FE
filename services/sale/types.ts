import { Item } from "services/item/types";
import { Data } from "services/types"

export interface Sale {
  id: string;
  invoice: string;
  date: Date;
  customer: string;
  __items__: Item[];
  unit: string;
  amount: number;
  total: number;
}

export type AddSale = Omit<Sale, "id">;

export type SaleData = Data<Sale>

export type SaleMessage = {
  message: string,
}