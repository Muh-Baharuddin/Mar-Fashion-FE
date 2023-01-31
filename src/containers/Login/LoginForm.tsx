import { Button, Form, InputGroup, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { IUser, UserContext } from 'src/context/UserContext'

export const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('ini user ', user)
  },[user])
  
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
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
      localStorage.setItem('token', token)
      router.push('/')
    }).catch((error) => {
      setUserName('');
      setPassword('');
      alert(error)
      console.error(error)
    })
  }

  return (
    <form>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faUser} fixedWidth />
        </InputGroup.Text>
        <Form.Control
          name="username"
          required
          placeholder="Username"
          aria-label="Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faLock} fixedWidth />
        </InputGroup.Text>
        <Form.Control
          type="password"
          name="password"
          required
          placeholder="Password"
          aria-label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </InputGroup>

      <Row>
        <Button
          onClick={handleSubmit}
          className="px-4"
          variant="secondary"
          type="submit"
        >
          Login
        </Button>
      </Row>
    </form>
  );
}
