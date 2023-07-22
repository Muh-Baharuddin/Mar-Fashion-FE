import { Data } from "services/types"

export interface Category {
  id: string
  name: string
}

export type AddCategory = Omit<Category, "id">

export type DataCategory = Data<Category>

export type CategoryMessage = {
  message: string,
}