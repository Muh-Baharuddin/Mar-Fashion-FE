import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useMarContext } from 'src/context/MarFashionProvider'
import axios from 'axios'
import Pagination from 'react-paginate'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AddModalKaryawan from '../Modal/AddModalKaryawan'
import EditModalKaryawan from '../Modal/EditModalKaryawan'

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

export const TableKaryawan = (props: handleShowType) => {
  const { showAdd, showEdit, setShowAdd, setShowEdit } = props
  const { user } = useMarContext()
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

  useEffect(() => {
    axios.get(`${process.env.API_ENDPOINT}karyawan`).then((response) => {
      setData(response.data)
    })
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.API_ENDPOINT}karyawan/` + id)
      .then((response) => {
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
              Object.values(data)
              .slice(offset, offset + perPage)
              .map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>{index + 1 + offset}</td>
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
    </div>
  )
}
