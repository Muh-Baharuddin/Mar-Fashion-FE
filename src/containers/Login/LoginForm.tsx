import { Button, Form, InputGroup, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export const LoginForm = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

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
      localStorage.setItem('token', response.data.accessToken)
      router.push('/')
    }).catch((error) => {
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
          // onChange={handleChange}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
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
          // onChange={handleChange}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
