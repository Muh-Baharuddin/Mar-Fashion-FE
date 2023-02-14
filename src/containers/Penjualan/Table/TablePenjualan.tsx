import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import Pagination from 'react-paginate'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCookies } from 'react-cookie'
import AddModalPenjualan from '../Modal/AddModalPenjualan'
import EditModalPenjualan from '../Modal/EditModalPenjualan'
import { useMarContext } from 'src/context/MarFashionProvider'

interface Data {
  id: string
  tanggal: string
  barang: string
  jumlah: number
  harga: number
}

type handleShowType = {
  showAdd: boolean
  showEdit: boolean
  setShowAdd: Dispatch<SetStateAction<boolean>>
  setShowEdit: Dispatch<SetStateAction<boolean>>
}

const TablePenjualan = (props: handleShowType) => {
  const { showAdd, showEdit, setShowAdd, setShowEdit } = props
  const { user } = useMarContext()
  const [cookies] = useCookies(['token'])
  const [data, setData] = useState<Data[]>([])
  const [editId, setEditId] = useState('')

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [offset, setOffset] = useState(0);

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
    setOffset(selectedPage * perPage);
  }

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
    axios.get('http://localhost:4000/nota-penjualan', config).then((response) => {
      setData(response.data)
    })
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete('http://localhost:4000/nota-penjualan/' + id, config)
      .then((response) => {
        console.log('ini nilai respon', response)
        alert(response.data.message)
        window.location.reload()
      })
  }
  return (
    <div className="card">
      <div className="card-header">
        <AddModalPenjualan showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
        <EditModalPenjualan
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
              <th>Tanggal</th>
              <th>Barang</th>
              <th>Jumlah</th>
              <th>Harga Barang</th>
              { user && <th>Action</th>}
            </tr>
          </thead>
        <tbody>
            {data &&
              Object.values(data)
              .slice(offset, offset + perPage)
              .map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>{index + 1 + offset}</td>
                    <td>{d.tanggal}</td>
                    <td>{d.barang}</td>
                    <td>{d.jumlah}</td>
                    <td>{d.harga}</td>
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
      <Pagination
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={Math.ceil(data.length / perPage)}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination-container" 
        activeClassName="selected"
        disabledClassName="disabled"
        pageLinkClassName={'pagination-item'}
      />
    </div>
  )
}

export default TablePenjualan