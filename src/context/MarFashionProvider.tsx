import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { IUser, UserContextType } from "../@types/user";

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

const MarFashionContext = createContext(defaultState)

export const useMarContext = () => {
  return useContext(MarFashionContext)
} 

const MarFashionProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);

  if(!cookies.token) {
    setCookie('token', null)
  }

  const [user, setUser] = useState<IUser>({
    id: '',
    userName: '',
    role: '',
    exp: 0,
    iat: 0,
  });

  useEffect(() => {
    setUser(cookies.user) 
  }, [])

  const login = (userName: string, password: string) => {
    axios({
      method: 'post',
      url: `${process.env.API_ENDPOINT}auth/login`,
      data: {
        userName,
        password,
      },
    }).then((response) => {
      const token = response.data.accessToken;
      const userData = jwtDecode<IUser>(token);
      setCookie('token', token, {
        path: '/'
      });
      setCookie('user', userData, {
        path: '/'
      });
      router.push('/', undefined, { shallow: true })
    }).catch((error) => {
      alert(error)
      console.error(error)
    })
  }

  const logout = () => {
    removeCookie("user")
    removeCookie("token")
    router.push('/', undefined, { shallow: true })
  }

  return (
    <MarFashionContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </MarFashionContext.Provider>
  )
}

export default MarFashionProvider;
