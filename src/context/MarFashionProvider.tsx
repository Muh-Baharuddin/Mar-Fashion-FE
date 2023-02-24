import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { setDefaultToken } from "services/api";
import { postLogin } from "services/login";
import { IUser, UserContextType } from "../@types/user";

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  user: undefined,
  setUser: (user: IUser) => {},
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

  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setUser(cookies.user);
    setDefaultToken(cookies.token);
    setIsLoading(false);  
  }, [])

  const login = (userName: string, password: string) => {
    postLogin({
      userName, password
    }).then((response) => {
      const token = response.data.accessToken;
      const userData = jwtDecode<IUser>(token);
      setCookie('token', token, {
        path: '/'
      });
      setCookie('user', userData, {
        path: '/'
      });
      setDefaultToken(token);
      router.push('/', undefined, { shallow: true })
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    })
  }

  const logout = () => {
    removeCookie("user")
    removeCookie("token")
    router.push('/', undefined, { shallow: true })
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MarFashionContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </MarFashionContext.Provider>
  )
}

export default MarFashionProvider;
