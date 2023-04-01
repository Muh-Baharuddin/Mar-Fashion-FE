import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useItemContext } from '../Item';
import { updateItem } from 'services/item';
import { AddItem, Item } from 'services/item/types';
import FormComp from './FormItem';
import FormItemTest from './FormItemTest';


type Props = {
  showEdit: boolean;
  item: Item,
  handleCloseEdit: () => void;
}

function EditModalItem(props: Props) {
  const {showEdit, item, handleCloseEdit } = props
  const {control} = useItemContext();

  const handleEdit = (data: AddItem) => {
    updateItem(item.id, data).then(response => {
      toast.success(response.data.message);
      handleCloseEdit();
      control.refresh();
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
          <Modal.Title>Edit Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormItemTest 
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