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

function EditModal(props: handleShowType) {
  const {showEdit, editId, handleCloseEdit} = props
  const { register, handleSubmit } = useForm();
  const [ cookies ] = useCookies(["token"]);

  console.log(editId);

  let token = cookies.token;
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    }
  }

  const handleEdit = (data: any) => {
    axios.patch('http://localhost:4000/barang/' + editId, data, config).then(response => {
      console.log("ini nilai respon", response )
      alert("Data berhasil diperbarui")
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
          <Modal.Title>Edit Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(handleEdit)}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Merek</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" 
              {...register("merek")}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Size</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" 
              {...register("size")}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Warna</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" 
              {...register("warna")}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Stok</label>
              <input type="number" min="0" className="form-control" id="exampleFormControlInput1" 
              {...register("stok")}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Harga</label>
              <input type="number" min="0" className="form-control" id="exampleFormControlInput1" 
              {...register("harga")}/>
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

export default EditModal