import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";


type handleShowType = {
  showEdit: boolean;
  editId: string;
  handleCloseEdit: () => void;
}

function EditModalAkun(props: handleShowType) {
  const {showEdit, editId, handleCloseEdit} = props
  const { register, handleSubmit } = useForm();
  const [ cookies ] = useCookies(["token"]);

  let token = cookies.token;
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    }
  }

  const handleEdit = (data: any) => {
    axios.patch('http://localhost:4000/user/' + editId, data, config).then(response => {
      alert(response.data.message)
      window.location.reload()
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
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="mb-3">
              <label className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                {...register('userName', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                {...register('role', { required: true })}
              />
            </div>
            <Button variant="primary" onClick={() => handleEdit} type="submit">
              Submit
            </Button>
            <Button className='mx-2' variant="secondary" onClick={handleCloseEdit}>
            Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModalAkun