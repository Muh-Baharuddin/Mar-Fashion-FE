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
import AddModalBarang from '../Modal/AddModalBarang'
import EditModalBarang from '../Modal/EditModalBarang'
import { useCookies } from 'react-cookie'
import DataTable from 'react-data-table-component'

interface Data {
  id: string
  merek: string
  size: string
  warna: string
  stok: number
  harga: number
}

type handleShowType = {
  showAdd: boolean
  showEdit: boolean
  setShowAdd: Dispatch<SetStateAction<boolean>>
  setShowEdit: Dispatch<SetStateAction<boolean>>
}

const TableBarang = (props: handleShowType) => {
  const { isLogin } = useContext(MarFashionContext)
  const [cookies] = useCookies(['token', 'user'])
  const { showAdd, showEdit, setShowAdd, setShowEdit } = props
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
    axios.get('http://localhost:4000/barang', config).then((response) => {
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
      .delete('http://localhost:4000/barang/' + id, config)
      .then((response) => {
        console.log('ini nilai respon', response)
        alert(response.data.message)
        window.location.reload()
      })
  }

  return (
    <div className="card">
      <div className="card-header">
        <AddModalBarang showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
        <EditModalBarang
          showEdit={showEdit}
          editId={editId}
          handleCloseEdit={handleCloseEdit}
        />

        {cookies.user && (
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
              <th>Merek</th>
              <th>Size</th>
              <th>Warna</th>
              <th>Stok</th>
              <th>Harga</th>
              {cookies.user && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.values(data).map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>{++index}</td>
                    <td>{d.merek.slice(0, 150)}</td>
                    <td>{d.size}</td>
                    <td>{d.warna}</td>
                    <td>{d.stok}</td>
                    <td>{d.harga}</td>
                    {cookies.user && (
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

export default TableBarang
