import axios from 'axios';
import { ResponseType } from './types';
import useSwr from 'swr'

export const setDefaultToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const fetcher = ({url, params}: {url: string, params: any}) => {
  return axios.get(url, { 
    params, 
  }).then(res => res.data)
}

export const stateGet = <T, D>(url: string, params: D) => {
  const { data, error, mutate } = useSwr<T, D>({ url, params }, fetcher);
  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  }
}

export const get = <T>(url: string) => {
  const fetcher = async () => {
    const response = await axios.get<T>(url);
    return response.data;
  };

  const { data, error } = useSwr<T>(url, fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

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
