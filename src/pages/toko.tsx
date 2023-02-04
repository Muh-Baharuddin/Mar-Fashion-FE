import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { AdminLayout } from '@layouts/AdminLayout/index'

const TokoPage = () => {
  return (
    <AdminLayout>
      <Container>
        <Row className="my-4">
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Baju</Card.Title>
                <Card.Text>
                  Terdapat berbagai macam baju dengan kualitas top dengan harga
                  termurah
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Celana</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Baju</Card.Title>
                <Card.Text>
                  Terdapat berbagai macam baju dengan kualitas top dengan harga
                  termurah
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Celana</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="celana"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Baju</Card.Title>
                <Card.Text>
                  Terdapat berbagai macam baju dengan kualitas top dengan harga
                  termurah
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Celana</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  )
}

export default TokoPage