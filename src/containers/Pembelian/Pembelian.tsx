import { AdminLayout } from '@layouts/AdminLayout'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import AddModalPembelian from './Modal/AddModalPembelian'
import EditModalPembelian from './Modal/EditModalPembelian'
import Pagination from 'react-paginate'
import { MarFashionContext } from 'src/context/MarFashionProvider'

interface Data {
  id: string
  tanggal: string
  supplier: string
  barang: string
  biaya: number
}

export const DataPembelian = () => {
  const { user } = useContext(MarFashionContext)
  const [cookies] = useCookies(['token', 'user'])
  const [data, setData] = useState<Data[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editId, setEditId] = useState('')

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [offset, setOffset] = useState(0);

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
    axios.get('http://localhost:4000/nota-pembelian', config).then((response) => {
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
      .delete('http://localhost:4000/nota-pembelian/' + id, config)
      .then((response) => {
        console.log('ini nilai respon', response)
        alert(response.data.message)
        window.location.reload()
      })
  }

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
    setOffset(selectedPage * perPage);
  }

  return (
    <AdminLayout>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <AddModalPembelian showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
            <EditModalPembelian
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
                  <th>Supplier</th>
                  <th>Total Biaya</th>
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
                        <td>{d.supplier}</td>
                        <td>{d.barang}</td>
                        <td>{d.biaya}</td>
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
                  })
                }
              </tbody>
            </table>
          </div>
          <div>
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
      </div>
    </AdminLayout>
  )
}
