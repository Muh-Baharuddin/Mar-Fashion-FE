import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormComp from './FormEmployee';
import { toast } from 'react-toastify';
import { postEmployee } from 'services/employee';
import { AddEmployee } from 'services/employee/types';
import { useEmployeeContext } from '../Employee';
import 'react-toastify/dist/ReactToastify.css';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalEmployee(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { control } = useEmployeeContext();

  const handleAdd = (data: AddEmployee) => {
    postEmployee(data).then(() => {
      toast.success('Data berhasil ditambahkan');
      control.refresh();
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
          <Modal.Title>Tambah Karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp handleForm={handleAdd} handleCloseForm={handleCloseAdd}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalEmployee
