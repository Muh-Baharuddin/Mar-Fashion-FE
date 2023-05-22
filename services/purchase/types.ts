import { Item } from "services/item/types";
import { Supplier } from "services/supplier/types";
import { Data } from "services/types"

export interface Purchase {
  id: string;
  invoice: string;
  date: Date;
  __items__: Item[];
  unit: string;
  amount: number;
  total: number;
  debt: number;
  __supplier__: Supplier;
}

export type AddPurchase = Omit<Purchase, "id">;

export type PurchaseData = Data<Purchase>

export type PurchaseMessage = {
  message: string,
}