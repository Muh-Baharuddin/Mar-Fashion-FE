import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormComplaint from './FormComplaint';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { postComplaint } from 'services/customer_complaint';
import { AddCustomerComplaint, Customer_Complaint } from 'services/customer_complaint/types';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalComplaint(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { tableData } = useTableContext<Customer_Complaint>();
  const { formData } = useFormContext<Customer_Complaint>()

  const handleAdd = (data: AddCustomerComplaint) => {
    postComplaint(data).then(() => {
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
          <Modal.Title>Tambah Keluhan Pelanggan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComplaint handleForm={handleAdd} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Tutup
          </Button>
          <Button variant="primary" onClick={() => {formData.control.submit()}}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddModalComplaint
