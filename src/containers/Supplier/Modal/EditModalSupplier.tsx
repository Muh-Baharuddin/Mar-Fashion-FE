import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SupplierForm from './SupplierForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { updateSupplier } from 'services/supplier';
import { AddSupplier, Supplier } from 'services/supplier/types';
import { useTableContext } from 'src/components/ApiTable';
import { Button } from 'react-bootstrap';


type Props = {
  showEdit: boolean;
  supplier: Supplier,
  handleCloseEdit: () => void;
}

function EditModalSupplier(props: Props) {
  const {showEdit, supplier, handleCloseEdit } = props
  const { tableData} = useTableContext<Supplier>();

  const handleEdit = (data: AddSupplier) => {
    updateSupplier(supplier.id, data).then(response => {
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
          <Modal.Title>Edit Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <SupplierForm 
            handleForm={handleEdit} 
            handleCloseForm={handleCloseEdit} 
            supplier={supplier}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Tutup
          </Button>
          <Button variant="primary">Kirim</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModalSupplier