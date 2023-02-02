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
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);


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
      setCookie('user', userData, {
        path: '/'
      });
      // localStorage.setItem('user', JSON.stringify(userData))
      // localStorage.setItem('token', token)
      router.push('/', undefined, { shallow: true })
    }).catch((error) => {
      // setUserName('');
      // setPassword('');
      alert(error)
      console.error(error)
    })
  }

  const Logout = () => {
    removeCookie("user")
    router.push('/', undefined, { shallow: true })
  }

  return (
    <MarFashionContext.Provider value={{ user, setUser, Login, Logout }}>
      {children}
    </MarFashionContext.Provider>
  )
}

export default MarFashionProvider;
