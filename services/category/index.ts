import * as api from "services/api";
import { DataCategory } from "./types";

const category_url = `${process.env.API_ENDPOINT}/item/category`

export const getCategorys = () => {
  return api.get<DataCategory>(category_url);
}
