import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormExpense';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddExpense, Expense } from 'services/expense/types';
import { updateExpense } from 'services/expense';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  expense: Expense,
  handleCloseEdit: () => void;
}

function EditModalExpense(props: Props) {
  const {showEdit, expense, handleCloseEdit } = props
  const { tableData } = useTableContext<Expense>();
  const { formData } = useFormContext<Expense>()

  const handleEdit = (data: AddExpense) => {
    updateExpense(expense.id, data).then(response => {
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
          <Modal.Title>Edit Pengeluaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            expense={expense}
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

export default EditModalExpense