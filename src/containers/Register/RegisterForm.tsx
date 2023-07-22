import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import axios from 'axios'

export const RegisterForm = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: `${process.env.API_ENDPOINT}/auth/register`,
      data: {
        userName,
        password,
        confirmPass,
      },
    }).then((response) => {
      console.log(response.data)
      console.log(response.status)
      router.push('/')
    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <form>
      <InputGroup className="mb-3">
        <InputGroup.Text><FontAwesomeIcon icon={faUser} fixedWidth /></InputGroup.Text>
        <Form.Control
          name="username"
          required
          placeholder="Username"
          aria-label="Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroup.Text>
        <Form.Control
          type="password"
          name="password"
          required
          placeholder="Password"
          aria-label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroup.Text>
        <Form.Control
          type="password"
          name="password_repeat"
          required
          placeholder="Ulang password"
          aria-label="Repeat password"
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
        />
      </InputGroup>

      <Button onClick={handleSubmit} type="submit" className="d-block w-100" variant="success">
        Buat Akun
      </Button>
    </form>
  )
}
