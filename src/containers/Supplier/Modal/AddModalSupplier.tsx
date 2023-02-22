import axios from 'axios'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postSupplier } from 'services/supplier'
import { useSupplierContext } from '../Supplier'

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalSupplier(props: handleShowType) {
  const { register, handleSubmit } = useForm()
  const { showAdd, handleCloseAdd } = props
  const { refreshSupplier } = useSupplierContext();

  const handleAdd = (data: any) => {
    postSupplier(data).then(() => {
      toast.success('Data berhasil ditambahkan');
      refreshSupplier();
      handleCloseAdd();
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
      handleCloseAdd();
    })
    // axios
    //   .post(`${process.env.API_ENDPOINT}supplier`, data)
    //   .then(() => {
    //     toast.success('Data berhasil ditambahkan');
    //     refreshSupplier();
    //     handleCloseAdd();
    //   })
  }

  return (
    <>
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
      >
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Tambah Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleAdd)}>
            <div className="mb-3">
              <label className="form-label">
                Nama
              </label>
              <input
                type="text"
                className="form-control"
                {...register('nama', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Alamat
              </label>
              <input
                type="text"
                className="form-control"
                {...register('alamat', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Nomor Telepon
              </label>
              <input
                type="text"
                className="form-control"
                {...register('nomor_telepon', { required: true })}
              />
            </div>
            <Button variant="primary" onClick={() => handleAdd} type="submit">
              Submit
            </Button>
            <Button
              className="mx-2"
              variant="secondary"
              onClick={handleCloseAdd}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalSupplier
