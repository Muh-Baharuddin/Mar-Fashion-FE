import axios from 'axios';
import { ParamsType, ResponseType } from './types';

export const get = async <T>(url: string, params: ParamsType): Promise<ResponseType<T>> => {
  const response = await axios.get<T>(url, {
    params,
  })
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const post = async <T>(url: string, data: T): Promise<ResponseType<T>> => {
  const response = await axios.post<T>(url, data);
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const patch = async <T>(url: string, data: T): Promise<ResponseType<T>> => {
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
