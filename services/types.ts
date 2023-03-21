export interface Data<T> {
  data: T[],
  total: number,
  message?: string,
}

export type QueryParamsType = {
  keywords: string,
  orderBy: string,
  orderType: string,
  page: number,
  limit: number,
}

export type ResponseType<T> = {
  data: T,
  statusCode: number,
}

export interface ContextInterface {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}
