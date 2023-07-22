import * as api from "services/api";
import { QueryParamsType } from "services/types";
import { AddUser, UserMessage, DataUser } from "./types";

export const user_url = `${process.env.API_ENDPOINT}/user` 

export const getUsers = (params: QueryParamsType) => {
  return api.stateGet<DataUser, QueryParamsType>(user_url, params);
}

export const updateUser = (id: string, data: AddUser) => {
  return api.patch<UserMessage>(user_url + "/" + id, data);
}

export const deleteUser = (id: string) => {
  return api.remove<UserMessage>(user_url + "/" + id);
}
