import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormComp from './PurchaseForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { postPurchase } from 'services/purchase';
import { AddPurchase, Purchase } from 'services/purchase/types';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalPurchase(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { tableData } = useTableContext<Purchase>();
  const { formData } = useFormContext<Purchase>();

  const handleAdd = (data: AddPurchase) => {
    postPurchase(data).then(() => {
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
          <Modal.Title>Tambah Pembelian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp handleForm={handleAdd} />
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

export default AddModalPurchase
