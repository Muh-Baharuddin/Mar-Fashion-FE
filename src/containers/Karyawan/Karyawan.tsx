import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useContext, useEffect, useState } from 'react'
import { MarFashionContext } from 'src/context/MarFashionProvider'
import { useCookies } from 'react-cookie'
import AddModalKaryawan from './Modal/AddModalKaryawan'
import EditModalKaryawan from './Modal/EditModalKaryawan'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'

interface Data {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

export const DataKaryawan = () => {
  const [cookies] = useCookies(['token', 'user'])
  const { user } = useContext(MarFashionContext)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [data, setData] = useState<Data[]>([])
  const [editId, setEditId] = useState('')

  const handleShowAdd = () => setShowAdd(true)
  const handleCloseAdd = () => setShowAdd(false)

  const handleShowEdit = (id: string) => {
    setEditId(id)
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setEditId('')
    setShowEdit(false)
  }

  let token = cookies.token
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  useEffect(() => {
    axios.get('http://localhost:4000/karyawan', config).then((response) => {
      setData(response.data)
    })
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete('http://localhost:4000/karyawan/' + id, config)
      .then((response) => {
        console.log('ini nilai respon', response)
        alert(response.data.message)
        window.location.reload()
      })
  }
  return (
    <div>
    { user.role == "ADMIN" ? 
      <AdminLayout>
        <div className="card">
          <div className="card-header">
            <AddModalKaryawan showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
            <EditModalKaryawan
              showEdit={showEdit}
              editId={editId}
              handleCloseEdit={handleCloseEdit}
            />
            { user && (
              <button onClick={handleShowAdd} className="btn btn-primary">
                <i className="bi bi-plus-square"></i>
              </button>
            )}
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Nomor Telepon</th>
                  { user && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {data &&
                  Object.values(data).map((d, index) => {
                    return (
                      <tr key={d.id}>
                        <td>{++index}</td>
                        <td>{d.nama}</td>
                        <td>{d.alamat}</td>
                        <td>{d.nomor_telepon}</td>
                        { user && (
                          <td>
                            <button
                              onClick={() => handleShowEdit(d.id)}
                              className="btn btn-primary ms-3"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(d.id)}
                              className="btn btn-danger ms-3"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout> :
      <KaryawanLayout>
        <div className="card">
          <div className="card-header">
            <AddModalKaryawan showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
            <EditModalKaryawan
              showEdit={showEdit}
              editId={editId}
              handleCloseEdit={handleCloseEdit}
            />

            { user && (
              <button onClick={handleShowAdd} className="btn btn-primary">
                <i className="bi bi-plus-square"></i>
              </button>
            )}
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Nomor Telepon</th>
                  { user && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {data &&
                  Object.values(data).map((d, index) => {
                    return (
                      <tr key={d.id}>
                        <td>{++index}</td>
                        <td>{d.nama}</td>
                        <td>{d.alamat}</td>
                        <td>{d.nomor_telepon}</td>
                        { user && (
                          <td>
                            <button
                              onClick={() => handleShowEdit(d.id)}
                              className="btn btn-primary ms-3"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(d.id)}
                              className="btn btn-danger ms-3"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </KaryawanLayout>
    }
    </div>
  )
}
