import { Data } from "services/types"

export interface Item {
  id: string
  brand: string
  capital_price: number;
  wholescale_price: number;
  stock: number;
}

export type AddItem = Omit<Item, "id">;

export type ItemData = Data<Item>

export type ItemMessage = {
  message: string,
}