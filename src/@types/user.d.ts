import { Dispatch, SetStateAction } from "react";

export interface IUser {
  id: string;
  userName: string;
  role: string;
  exp: number;
  iat: number;
};

export type UserContextType = {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  login: (userName: string, password: string) => void;
  logout: () => void;
};