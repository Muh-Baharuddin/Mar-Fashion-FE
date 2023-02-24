import { post } from "services/api";
import { Register } from "./types";

export const postRegister = (data: Register) => {
  return post<Register>(`${process.env.API_ENDPOINT}/auth/register`, data);
}