import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from "next/link";

function CardComp() {
  return (
    <div>
      <Row className="my-4">
      {[1,2,3,4,5,6,7].map(e => {
        return (
          <Col>
            <Card style={{ width: '20rem'}}>
              <Card.Img variant="top" src="https://hinyong.com/wp-content/uploads/2019/05/img_5696.jpg" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Button variant="danger">
                  <Link
                    href="/toko"
                    style={{ textDecoration: "none", color: "white"}}
                  >
                    Go somewhere
                  </Link>
                </Button>
            </Card>
          </Col>
        )
      })}
      </Row>
    </div>
  );
}

export default CardComp;