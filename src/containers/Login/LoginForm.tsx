import { Button, Form, InputGroup, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { SyntheticEvent, useContext, useState } from 'react'
import { useMarContext } from 'src/context/MarFashionProvider'

export const LoginForm = () => {
  const { login } = useMarContext()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    login(userName, password)
    setUserName('')
    setPassword('')
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
