import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormStoreLocation from './FormStoreLocation';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useTableContext } from '../../../components/ApiTable';
import { useFormContext } from '../../../components/DynamicForm';
import { AddStoreLocation, StoreLocation } from 'services/store_location/types';
import { updateStoreLocation } from 'services/store_location';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  showEdit: boolean;
  storeLocation: StoreLocation,
  handleCloseEdit: () => void;
}

function EditModalStore(props: Props) {
  const {showEdit, storeLocation, handleCloseEdit } = props
  const { tableData } = useTableContext<StoreLocation>();
  const { formData } = useFormContext<StoreLocation>()

  const handleEdit = (data: AddStoreLocation) => {
    updateStoreLocation(storeLocation.id, data).then(response => {
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
          <Modal.Title>Edit Informasi Toko</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormStoreLocation 
            handleForm={handleEdit} 
            storeLocation={storeLocation}
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

export default EditModalStore