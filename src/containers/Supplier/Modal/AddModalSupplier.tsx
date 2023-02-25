import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSuppliers, postSupplier } from 'services/supplier'
import { AddSupplier } from 'services/supplier/types'
import { useSupplierContext } from '../Supplier'
import FormComp from './FormComp';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalSupplier(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { queryParams } = useSupplierContext();
  const { mutate } = getSuppliers(queryParams);

  const handleAdd = (data: AddSupplier) => {
    postSupplier(data).then(() => {
      toast.success('Data berhasil ditambahkan');
      mutate();
      handleCloseAdd();
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
      handleCloseAdd();
    })
  }

  return (
    <>
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp handleForm={handleAdd} handleCloseForm={handleCloseAdd}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalSupplier
