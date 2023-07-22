import { Data } from "services/types"

export interface User {
  id: string
  userName: string
  password: string
  role: string
}

export type AddUser = Omit<User, "id">

export type DataUser = Data<User>

export type UserMessage = {
  message: string,
}