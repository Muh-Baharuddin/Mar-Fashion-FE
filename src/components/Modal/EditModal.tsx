import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type handleShowType = {
  showEdit: boolean;
  handleCloseEdit: () => void;
}

function EditModal(props: handleShowType) {
  const {showEdit, handleCloseEdit} = props

  return (
    <>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Merek</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Size</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Warna</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Stok</label>
            <input type="number" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Harga</label>
            <input type="number" className="form-control" id="exampleFormControlInput1" />
        </div>
        {/* <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
        </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal