import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import Pagination from 'react-paginate'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AddModalSupplier from '../Modal/AddModalSupplier'
import EditModalSupplier from '../Modal/EditModalSupplier'

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
  const [data, setData] = useState<Data[]>([])
  const [editId, setEditId] = useState('')

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  
  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  }
  
  const [filter, setFilter] = useState({
    keywords: "",
    orderBy: "nama",
    orderType: ""
  });

  const handleSearch = (event: any) => {
    setFilter({...filter, keywords: event.target.value});
  };

  const handleSortBy = (event: any) => {
    const value = event.target.value.split("-");
    setFilter({
      ...filter, 
      orderBy: value[0], 
      orderType: value[1]
    })
  };

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
    axios.get(`${process.env.API_ENDPOINT}supplier?page=${currentPage + 1}
      &limit=${perPage}&orderBy=${filter.orderBy}&orderType=${filter.orderType}&keywords=${filter.keywords}`)
      .then((response) => {
      console.log(response)
      setData(response.data.data)
      setTotal(response.data.total)
    })
  }, [currentPage, perPage, filter.orderBy, filter.orderType, filter.keywords])

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.API_ENDPOINT}supplier/` + id)
      .then((response) => {
        alert(response.data.message)
        window.location.reload()
      })
  }

  return (
    <>
      <h3>Data Supplier</h3>
      <div className="card">
        <div className="card-header">
          <AddModalSupplier showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
          <EditModalSupplier
              showEdit={showEdit}
              editId={editId}
              handleCloseEdit={handleCloseEdit}
          />
          <button onClick={handleShowAdd} className="btn btn-primary">
            <i className="bi bi-plus-square"></i>
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-12 col-md-8">
              <select onChange={handleSortBy}>
                <option value="nama-ASC">Sort By Nama (ASC)</option>
                <option value="nama-DESC">Sort By Nama (DESC)</option>
                <option value="alamat-ASC">Sort By Alamat (ASC)</option>
                <option value="alamat-DESC">Sort By Alamat (DESC)</option>
                <option value="nomor_telepon-ASC">
                  Sort By Nomor Telepon (ASC)
                </option>
                <option value="nomor_telepon-DESC">
                  Sort By Nomor Telepon (DESC)
                </option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <div className="search-bar">
                <input className='form-control' type="text" placeholder="Search" onChange={handleSearch} />
              </div>
            </div>
          </div>
        
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Nomor Telepon</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                Object.values(data)
                .map((d, index) => {
                  return (
                    <tr key={d.id}>
                      <td>{index + 1 + currentPage * perPage}</td>
                      <td>{d.nama}</td>
                      <td>{d.alamat}</td>
                      <td>{d.nomor_telepon}</td>
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
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={Math.ceil(total / perPage)}
          marginPagesDisplayed={0}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination-container" 
          activeClassName="selected"
          disabledClassName="disabled"
          pageLinkClassName={'pagination-item'}
        />
      </div>
    </>
  )
}

export default TableSupplier
