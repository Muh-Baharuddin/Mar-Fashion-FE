import axios from 'axios';
import { ResponseType } from './types';

export const setDefaultToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const get = async <T>(url: string, params: any): Promise<ResponseType<T>> => {
  const response = await axios.get<T>(url, {
    params,
  })
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const post = async <T>(url: string, data: any): Promise<ResponseType<T>> => {
  const response = await axios.post<T>(url, data);
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const patch = async <T>(url: string, data: any): Promise<ResponseType<T>> => {
  const response = await axios.patch<T>(url, data);
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const remove = async <T>(url: string): Promise<ResponseType<T>> => {
  const response = await axios.delete<T>(url);
  return {
    data: response.data,
    statusCode: response.status,
  };
}
