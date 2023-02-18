import { Dispatch, SetStateAction } from "react";

export interface IUser {
  id: string;
  userName: string;
  role: string;
  exp: number;
  iat: number;
};

export type UserContextType = {
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  login: (userName: string, password: string) => void;
  logout: () => void;
};

export type handleShowType = {
  showEdit: boolean
  setShowEdit: Dispatch<SetStateAction<boolean>>
}

export type QueryParamsType = {
  keywords: string,
  orderBy: string,
  orderType: string,
  page: number,
  limit: number,
}