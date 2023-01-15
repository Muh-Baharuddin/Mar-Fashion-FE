import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const EditAgenda = (props) => {
  // edit agenda
  const { register, handleSubmit } = useForm();
  
  const editAgenda = (data) => {
    axios
      .put(props.link + "/agenda/" + props.idAgenda, data, props.config)
      .then((response) => {
        alert(response.msg);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.msg);
      });
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Form Edit Agenda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(editAgenda)}>
          <Form.Group className="mb-3" controlId="merek">
            <Form.Label>Merek</Form.Label>
            <Form.Control
              type="text"
              {...register("merek", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              {...register("size", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="harga">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="text"
              {...register("harga", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="warna">
            <Form.Label>Warna</Form.Label>
            <Form.Control
              type="text"
              {...register("warna", { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stok">
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="text"
              {...register("stok", { required: true })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

export default EditAgenda;