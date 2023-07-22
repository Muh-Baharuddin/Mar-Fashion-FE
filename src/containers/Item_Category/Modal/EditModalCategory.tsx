import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormCategory';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddCategory, Category } from 'services/category/types';
import { updateCategory } from 'services/category';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  category: Category,
  handleCloseEdit: () => void;
}

function EditModalCategory(props: Props) {
  const {showEdit, category, handleCloseEdit } = props
  const { tableData } = useTableContext<Category>();
  const { formData } = useFormContext<Category>()

  const handleEdit = (data: AddCategory) => {
    updateCategory(category.id, data).then(response => {
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
          <Modal.Title>Edit Kategori Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            category={category}
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

export default EditModalCategory