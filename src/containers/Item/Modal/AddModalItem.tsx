import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getItems, postItem } from 'services/item';
import { AddItem } from 'services/item/types';
import { useItemContext } from '../Item';
import FormComp from './FormComp';

type handleShowType = {
  showAdd: boolean;
  handleCloseAdd: () => void;
}

function AddModalItem(props: handleShowType) {
  const { showAdd, handleCloseAdd } = props
  const { queryParams } = useItemContext();
  const { mutate } = getItems(queryParams);

  const handleAdd = (data: AddItem) => {
    postItem(data).then(() => {
      console.log("ini dari post", data)
      toast.success('Data berhasil ditambahkan');
      mutate();
      handleCloseAdd();
    }).catch((error) => {
      console.log("ini dari post", data)
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
          <FormComp handleForm={handleAdd} handleCloseForm={handleCloseAdd}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalItem
