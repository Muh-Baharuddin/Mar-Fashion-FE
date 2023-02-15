import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";

type handleShowType = {
  showEdit: boolean;
  editId: string;
  handleCloseEdit: () => void;
}

function EditModalPenjualan(props: handleShowType) {
  const {showEdit, editId, handleCloseEdit} = props
  const { register, handleSubmit } = useForm();

  const handleEdit = (data: any) => {
    axios.patch(`${process.env.API_ENDPOINT}nota-penjualan/` + editId, data).then(response => {
      alert(response.data.message)
      window.location.reload()
    })
  }

  return (
    <>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleEdit)}>
          <div className="mb-3">
              <label className="form-label">
                Tanggal
              </label>
              <input
                type="date"
                className="form-control"
                {...register('tanggal', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Barang
              </label>
              <input
                type="text"
                className="form-control"
                {...register('barang', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Jumlah
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                {...register('jumlah', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Harga Barang
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                {...register('harga', { required: true })}
              />
            </div>
            <Button variant="primary" onClick={() => handleEdit} type="submit">
              Submit
            </Button>
            <Button className='mx-2' variant="secondary" onClick={handleCloseEdit}>
            Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalPenjualan