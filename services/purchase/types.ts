import { Item } from "services/item/types";
import { Data } from "services/types"

export interface Purchase {
  id: string;
  invoice: string;
  date: Date;
  supplier: string;
  __items__: Item | Item[];
  unit: string;
  debt: number;
  total: number;
}

export type AddPurchase = Omit<Purchase, "id" | "__items__"> & {
  items: Item | Item[];
};

export type PurchaseData = Data<Purchase>

export type PurchaseMessage = {
  message: string,
}