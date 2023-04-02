import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormComp from './FormItem';
import { toast } from 'react-toastify';
import { postItem } from 'services/item';
import { AddItem, Item } from 'services/item/types';
import { useItemContext } from '../Item';
import 'react-toastify/dist/ReactToastify.css';
import FormItemTest from './FormItem';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalItem(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const {control} = useItemContext();

  const handleAdd = (data: AddItem) => {
    postItem(data).then(() => {
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
          <Modal.Title>Tambah Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormItemTest handleForm={handleAdd} handleCloseForm={handleCloseAdd}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalItem
