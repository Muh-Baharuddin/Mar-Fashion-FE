import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormEmployee';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddEmployee, Employee } from 'services/employee/types';
import { updateEmployee } from 'services/employee';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  employee: Employee,
  handleCloseEdit: () => void;
}

function EditModalEmployee(props: Props) {
  const {showEdit, employee, handleCloseEdit } = props
  const { tableData } = useTableContext<Employee>();
  const { formData } = useFormContext<Employee>()

  const handleEdit = (data: AddEmployee) => {
    updateEmployee(employee.id, data).then(response => {
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
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            employee={employee}
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

export default EditModalEmployee