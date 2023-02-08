import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type handleShowType = {
  show: boolean;
  handleClose: () => void;
}

function ModalComp(props: handleShowType) {
  const {show, handleClose} = props

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComp