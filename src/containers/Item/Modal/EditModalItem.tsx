import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ItemForm from './ItemForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { updateItem } from 'services/item';
import { AddItem, Item } from 'services/item/types';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';


type Props = {
  showEdit: boolean;
  item: Item,
  handleCloseEdit: () => void;
}

function EditModalItem(props: Props) {
  const {showEdit, item, handleCloseEdit } = props
  const { tableData } = useTableContext<Item>();
  const { formData } = useFormContext<Item>()

  const handleEdit = (data: AddItem) => {
    updateItem(item.id, data).then(response => {
      toast.success(response.data.message);
      handleCloseEdit();
      tableData.control.refresh();
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
          <ItemForm 
            handleForm={handleEdit} 
            item={item}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Tutup
          </Button>
          <Button variant="primary" onClick={() => {formData.control.submit()}}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModalItem