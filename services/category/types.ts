import { Data } from "services/types"

export interface Category {
  id: string
  name: string
}

export type DataCategory = Data<Category>