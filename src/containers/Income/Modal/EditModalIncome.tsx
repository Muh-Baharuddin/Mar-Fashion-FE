import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormIncome';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddIncome, Income } from 'services/income/types';
import { updateIncome } from 'services/income';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  income: Income,
  handleCloseEdit: () => void;
}

function EditModalIncome(props: Props) {
  const {showEdit, income, handleCloseEdit } = props
  const { tableData } = useTableContext<Income>();
  const { formData } = useFormContext<Income>()

  const handleEdit = (data: AddIncome) => {
    updateIncome(income.id, data).then(response => {
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
          <Modal.Title>Edit Pendapatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            income={income}
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

export default EditModalIncome