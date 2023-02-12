import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { MarFashionContext } from 'src/context/MarFashionProvider'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AddModalKaryawan from '../Modal/AddModalKaryawan'
import EditModalKaryawan from '../Modal/EditModalKaryawan'
import { useCookies } from 'react-cookie'
import DataTable from 'react-data-table-component'

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

const TableKaryawan = (props: handleShowType) => {
  const { showAdd, showEdit, setShowAdd, setShowEdit } = props
  const { isLogin } = useContext(MarFashionContext)
  const [cookies] = useCookies(['token', 'user'])
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
    axios.get('http://localhost:4000/karyawan', config).then((response) => {
      setData(response.data)
    })
  }, [])

  let token = cookies.token
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

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
    <div className="card">
      <div className="card-header">
        <AddModalKaryawan showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
        <EditModalKaryawan
          showEdit={showEdit}
          editId={editId}
          handleCloseEdit={handleCloseEdit}
        />

        {isLogin && (
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
              {isLogin && <th>Action</th>}
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
                    {isLogin && (
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

export default TableKaryawan
