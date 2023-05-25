import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormIncome from './FormIncome';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { postIncome } from 'services/income';
import { AddIncome, Income } from 'services/income/types';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalIncome(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { tableData } = useTableContext<Income>();
  const { formData } = useFormContext<Income>()

  const handleAdd = (data: AddIncome) => {
    postIncome(data).then(() => {
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
          <Modal.Title>Tambah Pendapatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormIncome handleForm={handleAdd} />
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

export default AddModalIncome
