import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Pagination from 'react-paginate'
import axios from 'axios'
import AddModalBarang from './Modal/AddModalBarang'
import EditModalBarang from './Modal/EditModalBarang'

interface Data {
  id: string
  merek: string
  size: string
  warna: string
  stok: number
  harga: number
}

export const DataBarang = () => {
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

  let token = cookies.token
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  useEffect(() => {
    axios.get('http://localhost:4000/barang', config).then((response) => {
      setData(response.data)
    })
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete('http://localhost:4000/barang/' + id, config)
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
    <div>
    { cookies.user?.role == "ADMIN" ? 
      <AdminLayout>
        <div className="container">
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
                    Object.values(data)
                    .slice(offset, offset + perPage)
                    .map((d, index) => {
                      return (
                        <tr key={d.id}>
                          <td>{index + 1 + offset}</td>
                          <td>{d.merek}</td>
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
      </AdminLayout> :
      <KaryawanLayout>
        <div className="container">
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
                    Object.values(data)
                    .slice(offset, offset + perPage)
                    .map((d, index) => {
                      return (
                        <tr key={d.id}>
                          <td>{index + 1 + offset}</td>
                          <td>{d.merek}</td>
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
      </KaryawanLayout>
    }
    </div>
  )
}
