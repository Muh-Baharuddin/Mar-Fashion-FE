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
  myToken: string | undefined;
};