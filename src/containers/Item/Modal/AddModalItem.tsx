import axios from 'axios'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'

type handleShowType = {
  showAdd: boolean
  handleCloseAdd: () => void
}

function AddModalItem(props: handleShowType) {
  const { register, handleSubmit } = useForm()
  const { showAdd, handleCloseAdd } = props
  const [cookies] = useCookies(['token'])

  let token = cookies.token
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  const handleAdd = (data: any) => {
    axios
      .post('http://localhost:4000/barang', data, config)
      .then((response) => {
        alert('Data berhasil ditambahkan')
        window.location.reload()
      })
  }

  return (
    <>
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleAdd)}>
            <div className="mb-3">
              <label className="form-label">
                Merek
              </label>
              <input
                type="text"
                className="form-control"
                {...register('merek', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Size
              </label>
              <input
                type="text"
                className="form-control"
                {...register('size', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Warna
              </label>
              <input
                type="text"
                className="form-control"
                {...register('warna', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Stok
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                {...register('stok', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Harga
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                {...register('harga', { required: true })}
              />
            </div>
            <Button variant="primary" onClick={() => handleAdd} type="submit">
              Submit
            </Button>
            <Button
              className="mx-2"
              variant="secondary"
              onClick={handleCloseAdd}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddModalItem
