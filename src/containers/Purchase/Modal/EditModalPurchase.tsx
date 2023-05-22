import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './PurchaseForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddPurchase, Purchase } from 'services/purchase/types';
import { updatePurchase } from 'services/purchase';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';


type Props = {
  showEdit: boolean;
  purchase: Purchase,
  handleCloseEdit: () => void;
}

function EditModalPurchase(props: Props) {
  const {showEdit, purchase, handleCloseEdit } = props
  const { tableData} = useTableContext<Purchase>();
  const { formData } = useFormContext<Purchase>();

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
            purchase={purchase}
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

export default EditModalPurchase