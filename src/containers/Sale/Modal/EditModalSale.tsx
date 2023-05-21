import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SaleForm from './SaleForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import { AddSale, Sale } from 'services/sale/types';
import { updateSale } from 'services/sale';


type Props = {
  showEdit: boolean;
  sale: Sale,
  handleCloseEdit: () => void;
}

function EditModalSale(props: Props) {
  const {showEdit, sale, handleCloseEdit } = props
  const { tableData } = useTableContext<Sale>();
  const { formData } = useFormContext<Sale>()

  const handleEdit = (data: AddSale) => {
    updateSale(sale.id, data).then(response => {
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
          <Modal.Title>Edit Penjualan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleForm 
            handleForm={handleEdit} 
            sale={sale}
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

export default EditModalSale