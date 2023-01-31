import { createContext, FC, useState, Dispatch, SetStateAction } from "react";

export type IUser = {
  id: string;
  userName: string;
  role: string;
  exp: number;
  iat: number;
};


export type UserContextType = {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
};

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  user: {
    id: '',
    userName: '',
    role: '',
    exp: 0,
    iat: 0,
  },
  setUser: (user: IUser) => {}
} as UserContextType

export const UserContext = createContext(defaultState)
// export const UserContext = createContext({} as UserContextType)
// export const UserContext = createContext({})

const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    id: '',
    userName: '',
    role: '',
    exp: 0,
    iat: 0,
  }
);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;