import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormComp from './FormUser';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AddUser, User } from 'services/user/types';
import { updateUser } from 'services/user';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  user: User,
  handleCloseEdit: () => void;
}

function EditModalUser(props: Props) {
  const {showEdit, user, handleCloseEdit } = props
  const { tableData } = useTableContext<User>();
  const { formData } = useFormContext<User>()

  const handleEdit = (data: AddUser) => {
    updateUser(user.id, data).then(response => {
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
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp 
            handleForm={handleEdit} 
            user={user}
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

export default EditModalUser