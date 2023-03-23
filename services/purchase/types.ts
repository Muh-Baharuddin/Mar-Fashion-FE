import { Data } from "services/types"

export interface Purchase {
  id: string;
  invoice: string;
  date: Date;
  supplier: string;
  unit: string;
  debt: number;
  cost: string;
}

export type AddPurchase = Omit<Purchase, "id">;

export type PurchaseData = Data<Purchase>

export type PurchaseMessage = {
  message: string,
}