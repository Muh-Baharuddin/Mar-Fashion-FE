import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useItemContext } from '../Item';
import { getItems, updateItem } from 'services/item';
import { AddItem, Item } from 'services/item/types';
import FormComp from './FormComp';


type Props = {
  showEdit: boolean;
  item: Item,
  handleCloseEdit: () => void;
}

function EditModalItem(props: Props) {
  const {showEdit, item, handleCloseEdit } = props
  const { queryParams } = useItemContext();

  const { mutate } = getItems(queryParams);

  const handleEdit = (data: AddItem) => {
    updateItem(item.id, data).then(response => {
      toast.success(response.data.message);
      handleCloseEdit();
      mutate();
    })
  }

  return (
    <>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            handleCloseForm={handleCloseEdit} 
            item={item}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalItem