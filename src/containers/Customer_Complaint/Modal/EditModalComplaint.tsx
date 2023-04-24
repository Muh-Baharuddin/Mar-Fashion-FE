import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormComplaint';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddCustomerComplaint, Customer_Complaint } from 'services/customer_complaint/types';
import { updateComplaint } from 'services/customer_complaint';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  complaint: Customer_Complaint,
  handleCloseEdit: () => void;
}

function EditModalComplaint(props: Props) {
  const {showEdit, complaint, handleCloseEdit } = props
  const { tableData } = useTableContext<Customer_Complaint>();
  const { formData } = useFormContext<Customer_Complaint>()

  const handleEdit = (data: AddCustomerComplaint) => {
    updateComplaint(complaint.id, data).then(response => {
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
          <Modal.Title>Edit Keluhan Pelanggan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            complaint={complaint}
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

export default EditModalComplaint