import axios from 'axios';

export const get = async <T>(url: string, params: Record<string, number | string | Date >): Promise<{
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
