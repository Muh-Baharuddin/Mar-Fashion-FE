import axios from 'axios';
import { ParamsType, ResponseType, ResponseDataType } from './types';

export const get = async <T>(url: string, params: ParamsType): Promise<ResponseDataType<T>> => {
  const response = await axios.get<T>(url, {
    params,
  });
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const post = async <T>(url: string, data: T): Promise<ResponseDataType<T>> => {
  const response = await axios.post<T>(url, data);
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const patch = async <T>(url: string, data: T): Promise<ResponseDataType<T>> => {
  const response = await axios.patch<T>(url, data);
  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const remove = async (url: string): Promise<ResponseType> => {
  const response = await axios.delete(url);
  return {
    statusCode: response.status,
    message: response.data.message,
  };
}
