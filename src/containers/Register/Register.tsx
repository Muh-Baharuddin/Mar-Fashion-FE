import { Card, Col, Container, Row } from 'react-bootstrap'
import { RegisterForm } from './RegisterForm'

export const Register = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1>Buat Akun</h1>
                <p className="text-black-50">Silahkan masukkan data akun</p>
                <RegisterForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
