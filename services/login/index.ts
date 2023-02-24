import { post } from "services/api";
import { LoginData, LoginResponse } from "./types";

export const postLogin = (data: LoginData) => {
  return post<LoginResponse>(`${process.env.API_ENDPOINT}/auth/login`, data);
}