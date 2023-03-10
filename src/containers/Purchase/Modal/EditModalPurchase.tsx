import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useSupplierContext } from '../Supplier';
import 'react-toastify/dist/ReactToastify.css';
import { getSuppliers, updateSupplier } from 'services/supplier';
import { AddSupplier, Supplier } from 'services/supplier/types';
import FormComp from './FormComp';
import { usePurchaseContext } from '../Purchase';


type Props = {
  showEdit: boolean;
  supplier: Supplier,
  handleCloseEdit: () => void;
}

function EditModalPurchase(props: Props) {
  const {showEdit, supplier, handleCloseEdit } = props
  const { queryParams } = usePurchaseContext();

  const { mutate } = getSuppliers(queryParams);

  const handleEdit = (data: AddSupplier) => {
    updateSupplier(supplier.id, data).then(response => {
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
            supplier={supplier}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalPurchase