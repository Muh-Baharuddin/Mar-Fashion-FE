import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormComp';
import { toast } from 'react-toastify';
import { useEmployeeContext } from '../Employee';
import { AddEmployee, Employee } from 'services/employee/types';
import { getEmployees, updateEmployee } from 'services/employee';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  employee: Employee,
  handleCloseEdit: () => void;
}

function EditModalEmployee(props: Props) {
  const {showEdit, employee, handleCloseEdit } = props
  const { queryParams } = useEmployeeContext();

  const { mutate } = getEmployees(queryParams);

  const handleEdit = (data: AddEmployee) => {
    updateEmployee(employee.id, data).then(response => {
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
            employee={employee}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalEmployee