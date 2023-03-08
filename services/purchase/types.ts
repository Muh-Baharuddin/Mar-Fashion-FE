import { Data } from "services/types"

export interface Purchase {
  id: string
  date: Date
  unit: string
  cost: string
}

export type AddPurchase = Omit<Purchase, "id">;

export type PurchaseData = Data<Purchase>

export type PurchaseMessage = {
  message: string,
}