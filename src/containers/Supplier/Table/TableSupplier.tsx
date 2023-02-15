import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AddModalSupplier from '../Modal/AddModalSupplier'
import EditModalSupplier from '../Modal/EditModalSupplier'
import { useMarContext } from 'src/context/MarFashionProvider'

interface Data {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

type handleShowType = {
  showAdd: boolean
  showEdit: boolean
  setShowAdd: Dispatch<SetStateAction<boolean>>
  setShowEdit: Dispatch<SetStateAction<boolean>>
}

const TableSupplier = (props: handleShowType) => {
  const { showAdd, showEdit, setShowAdd, setShowEdit } = props
  const { user } = useMarContext()
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


  useEffect(() => {
    axios.get('http://localhost:4000/supplier').then((response) => {
      setData(response.data)
    })
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete('http://localhost:4000/supplier/' + id)
      .then((response) => {
        alert(response.data.message)
        window.location.reload()
      })
  }

  return (
    <div className="card">
      <div className="card-header">
      <AddModalSupplier showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
      <EditModalSupplier
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
  )
}

export default TableSupplier
