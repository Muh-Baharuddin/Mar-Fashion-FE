import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormComp from './FormComp';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { postSupplier } from 'services/supplier'
import { AddSupplier, Supplier } from 'services/supplier/types'
import { useTableContext } from 'src/components/ApiTable';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalSupplier(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { tableData } = useTableContext<Supplier>();

  const handleAdd = (data: AddSupplier) => {
    postSupplier(data).then(() => {
      toast.success('Data berhasil ditambahkan');
      tableData.control.refresh();
      handleCloseAdd();
    }).catch((error) => {
      let errorMessage = "Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.";
      if (Array.isArray(error.response.data.message)) {
        errorMessage = error.response.data.message.join(", ");
      }
      toast.error(errorMessage);
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
