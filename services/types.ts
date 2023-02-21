export interface Data <T>{
  data: T[],
  total: number;
}

export type QueryParamsType = {
  keywords: string,
  orderBy: string,
  orderType: string,
  page: number,
  limit: number,
}