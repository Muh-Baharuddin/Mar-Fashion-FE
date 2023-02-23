import { post } from "services/api";
import { Login, LoginResponse } from "./types";

export const postLogin = (data: Login) => {
  return post<LoginResponse>(`${process.env.API_ENDPOINT}/auth/login`, data);
}