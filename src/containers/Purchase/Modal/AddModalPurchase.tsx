import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPurchases, postPurchase } from 'services/purchase';
import { AddPurchase } from 'services/purchase/types';
import { usePurchaseContext } from '../Purchase'
import FormComp from './FormComp';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalPurchase(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { queryParams } = usePurchaseContext();
  const { mutate } = getPurchases(queryParams);

  const handleAdd = (data: AddPurchase) => {
    postPurchase(data).then(() => {
      toast.success('Data berhasil ditambahkan');
      mutate();
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
          <FormComp handleForm={handleAdd} handleCloseForm={handleCloseAdd}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalPurchase
