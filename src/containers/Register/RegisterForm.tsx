import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { postRegister } from 'services/register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterForm = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    postRegister({
      userName,
      password,
      confirmPass,
    }).then(() => {
      toast.success('Akun berhasil dibuat', { autoClose: 1000 });
      setTimeout(() => router.push('/'), 2000);
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.", { autoClose: 1000 });
      setTimeout(() => router.push('/'), 2000);
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
