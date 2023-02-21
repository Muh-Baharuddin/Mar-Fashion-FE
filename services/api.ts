import axios from 'axios';
import { Supplier } from './supplier/types';

export const post = async <T>(url: string, data: Supplier): Promise<{
  data: T,
  statusCode: number,
}> => {
  const response = await axios.post(url, data);

  return {
    data: response.data,
    statusCode: response.status,
  };
}
