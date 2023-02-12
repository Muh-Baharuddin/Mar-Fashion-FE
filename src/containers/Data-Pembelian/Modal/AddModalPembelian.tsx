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

function AddModalPembelian(props: handleShowType) {
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
      .post('http://localhost:4000/nota-pembelian', data, config)
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
          <Modal.Title>Tambah Karyawan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleAdd)}>
            <div className="mb-3">
              <label className="form-label">
                Tanggal
              </label>
              <input
                type="date"
                className="form-control"
                {...register('tanggal', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Supplier
              </label>
              <input
                type="text"
                className="form-control"
                {...register('supplier', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Barang
              </label>
              <input
                type="text"
                className="form-control"
                {...register('barang', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Total Biaya
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                {...register('biaya', { required: true })}
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

export default AddModalPembelian
