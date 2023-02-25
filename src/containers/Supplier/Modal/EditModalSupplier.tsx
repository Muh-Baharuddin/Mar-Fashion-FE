import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useSupplierContext } from '../Supplier';
import 'react-toastify/dist/ReactToastify.css';
import { updateSupplier } from 'services/supplier';
import { AddSupplier, Supplier } from 'services/supplier/types';
import FormComp from './FormComp';


type Props = {
  showEdit: boolean;
  supplier: Supplier,
  handleCloseEdit: () => void;
}

function EditModalSupplier(props: Props) {
  const {showEdit, supplier, handleCloseEdit } = props
  const { refreshSupplier } = useSupplierContext();

  const handleEdit = (data: AddSupplier) => {
    updateSupplier(supplier.id, data).then(response => {
      toast.success(response.data.message);
      handleCloseEdit();
      refreshSupplier();
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
            supplier={supplier}
          />
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditModalSupplier