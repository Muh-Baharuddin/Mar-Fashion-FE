import React from 'react'
import Modal from 'react-bootstrap/Modal'
import SaleForm from './SaleForm';
import { toast } from 'react-toastify';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import { Button } from 'react-bootstrap';
import { AddSale, Sale } from 'services/sale/types';
import { postSale } from 'services/sale';
import 'react-toastify/dist/ReactToastify.css';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalSale(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { tableData } = useTableContext<Sale>();
  const { formData } = useFormContext<Sale>()
  
  const handleAdd = (data: AddSale) => {
    postSale(data).then(() => {
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
          <Modal.Title>Tambah Penjualan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleForm handleForm={handleAdd} />
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

export default AddModalSale
