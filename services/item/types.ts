import { Category } from "services/category/types";
import { Supplier } from "services/supplier/types";
import { Data } from "services/types"

export interface Item {
  id: string
  brand: string
  capital_price: number;
  wholescale_price: number;
  stock: number;
  __supplier__?: Supplier;
  __categories__: Category[];
}

export type AddItem = Omit<Item, "id">;

export type ItemData = Data<Item>

export type ItemMessage = {
  message: string,
}
