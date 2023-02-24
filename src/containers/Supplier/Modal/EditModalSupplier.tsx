import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useSupplierContext } from '../Supplier';
import 'react-toastify/dist/ReactToastify.css';
import { updateSupplier } from 'services/supplier';


type Props = {
  showEdit: boolean;
  editId: string;
  handleCloseEdit: () => void;
}

function EditModalSupplier(props: Props) {
  const {showEdit, editId, handleCloseEdit } = props
  const { refreshSupplier } = useSupplierContext();
  const { register, handleSubmit } = useForm();

  const handleEdit = (data: any) => {
    updateSupplier(editId, data).then(response => {
      toast.success(response.data.message);
      handleCloseEdit();
      refreshSupplier();
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
          <Modal.Title>Edit Supplier</Modal.Title>
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
      <ToastContainer />
    </>
  );
}

export default EditModalSupplier