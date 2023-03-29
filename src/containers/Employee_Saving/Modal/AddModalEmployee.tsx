import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormComp from './FormEmployeeSaving';
import { toast } from 'react-toastify';
import { postEmployeeSaving } from 'services/employee';
import { AddEmployeeSaving } from 'services/employee/types';
import { useEmployeeSavingContext } from '../Employee_Saving';
import 'react-toastify/dist/ReactToastify.css';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalEmployee(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { control } = useEmployeeSavingContext();

  const handleAdd = (data: AddEmployeeSaving) => {
    postEmployeeSaving(data).then(() => {
      toast.success('Data Simpanan Karyawan berhasil ditambahkan');
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
          <Modal.Title>Kelola Simpanan Karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp handleForm={handleAdd} handleCloseForm={handleCloseAdd}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalEmployee
