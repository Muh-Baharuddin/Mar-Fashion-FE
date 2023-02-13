import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";


type handleShowType = {
  showEdit: boolean;
  editId: string;
  handleCloseEdit: () => void;
}

function EditModalKaryawan(props: handleShowType) {
  const {showEdit, editId, handleCloseEdit} = props
  const { register, handleSubmit } = useForm();
  const [ cookies ] = useCookies(["token"]);

  let token = cookies.token;
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    }
  }

  const handleEdit = (data: any) => {
    axios.patch('http://localhost:4000/karyawan/' + editId, data, config).then(response => {
      alert("Data berhasil diperbarui")
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

export default EditModalKaryawan