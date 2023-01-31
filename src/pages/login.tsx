import UserProvider from 'src/context/UserContext';
import { Login } from '../containers/Login'

const LoginPage = () => {
  return (
    <UserProvider>
      <Login />
    </UserProvider>
  )
}

export default LoginPage;