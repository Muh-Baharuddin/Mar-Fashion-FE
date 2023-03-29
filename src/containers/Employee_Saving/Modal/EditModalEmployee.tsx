import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormEmployeeSaving';
import { toast } from 'react-toastify';
import { useEmployeeSavingContext } from '../Employee_Saving';
import { AddEmployeeSaving, EmployeeSaving } from 'services/employee/types';
import { updateEmployeeSaving } from 'services/employee';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  employeeSaving: EmployeeSaving,
  handleCloseEdit: () => void;
}

function EditModalEmployee(props: Props) {
  const {showEdit, employeeSaving, handleCloseEdit } = props
  const { control } = useEmployeeSavingContext();

  const handleEdit = (data: AddEmployeeSaving) => {
    updateEmployeeSaving(employeeSaving.id, data).then(response => {
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
          <Modal.Title>Edit Simpanan Karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            handleCloseForm={handleCloseEdit} 
            employeeSaving={employeeSaving}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalEmployee