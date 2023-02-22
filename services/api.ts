import axios from 'axios';
import { ParamsType } from './types';

export const get = async <T>(url: string, params: ParamsType): Promise<{
  data: T,
  statusCode: number,
}> => {
  const response = await axios.get(url, {
    params,
  });

  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const post = async <T>(url: string, data: T): Promise<{
  data: T,
  statusCode: number,
}> => {
  const response = await axios.post(url, data);

  return {
    data: response.data,
    statusCode: response.status,
  };
}

export const patch = async <T>(url: string, id: string, data: T): Promise<{
  data: T,
  statusCode: number,
  message: string
}> => {
  const patchedUrl = `${url}/${id}`;
  const response = await axios.patch(patchedUrl, data);

  return {
    data: response.data,
    statusCode: response.status,
    message: response.data.message,
  };
}

export const remove = async (url: string, id: string): Promise<{
  statusCode: number,
  message: string
}> => {
  const deleteUrl = `${url}/${id}`;
  const response = await axios.delete(deleteUrl);

  return {
    statusCode: response.status,
    message: response.data.message,
  };
}
