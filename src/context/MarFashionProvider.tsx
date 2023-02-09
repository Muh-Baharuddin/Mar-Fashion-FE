import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, FC, useState } from "react";
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

export const MarFashionContext = createContext(defaultState)

const MarFashionProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState<IUser>({
    id: '',
    userName: '',
    role: '',
    exp: 0,
    iat: 0,
  });

  const Login = (userName: string, password: string) => {
    axios({
      method: 'post',
      url: `${process.env.API_ENDPOINT}auth/login`,
      data: {
        userName,
        password,
      },
    }).then((response) => {
      console.log(response.data)
      console.log(response.status)
      const token = response.data.accessToken;
      const userData = jwtDecode<IUser>(token);
      setUser(userData);
      setIsLogin(true);
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

  const Logout = () => {
    removeCookie("user")
    removeCookie("token")
    setIsLogin(false);
    router.push('/', undefined, { shallow: true })
  }

  const login = () => {
    setIsLogin(true);
  }

  return (
    <MarFashionContext.Provider value={{ user, setUser, Login, Logout, login, isLogin }}>
      {children}
    </MarFashionContext.Provider>
  )
}

export default MarFashionProvider;
