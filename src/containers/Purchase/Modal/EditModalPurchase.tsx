import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { AddPurchase, Purchase } from 'services/purchase/types';
import { updatePurchase } from 'services/purchase';
import FormComp from './FormComp';
import 'react-toastify/dist/ReactToastify.css';
import { useTableContext } from 'src/components/ApiTable';


type Props = {
  showEdit: boolean;
  purchase: Purchase,
  handleCloseEdit: () => void;
}

function EditModalPurchase(props: Props) {
  const {showEdit, purchase, handleCloseEdit } = props
  const { tableData} = useTableContext<Purchase>();

  const handleEdit = (data: AddPurchase) => {
    updatePurchase(purchase.id, data).then(response => {
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
          <Modal.Title>Edit Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            handleCloseForm={handleCloseEdit} 
            purchase={purchase}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalPurchase