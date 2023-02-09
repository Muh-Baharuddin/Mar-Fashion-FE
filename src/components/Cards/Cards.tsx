import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from "next/link";

type data = {
  title: string,
  description: string,
  domisili: string,
  alamat: string,
  img: string,
  idToko: string,
}

const CardComp = (e: data) => {
  return (
    <div className="card my-3">
      <img src={e.img} alt={e.title} className='card-img-top' />
      <div className="card-body">
        <h5>{e.title}</h5>
        <p>{e.description}</p>
      </div>
      <ul className='list-group list-group-flush'>
        <li className="list-group-item">Domisili: {e.domisili} </li>
        <li className="list-group-item">Alamat: {e.alamat} </li>
      </ul>
      <div className="card-body">
        <Link href={`/barang`} className="btn btn-danger">
            Daftar Barang
        </Link>
      </div>
    </div>
  );
}

export default CardComp;