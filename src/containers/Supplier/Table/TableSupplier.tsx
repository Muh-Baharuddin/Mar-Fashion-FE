import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'react-paginate'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { handleShowType, QueryParamsType } from 'src/@types/user'
import DeleteComp from './Components/DeleteComp'

export interface Supplier {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

interface Data {
  data: Supplier[],
  total: number;
}

const TableSupplier = (props: handleShowType) => {
  const { showEdit, setShowEdit } = props
  const [data, setData] = useState<Data>({
    data: [],
    total: 0,
  });
  const [editId, setEditId] = useState('');
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    keywords: '',
    orderBy: 'nama',
    orderType: '',
    page: 1,
    limit: 10,
  })

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setQueryParams((prev) => {
      return { ...prev, page: selectedPage+1};
    });
  }

  const handleSearch = (event: any) => {
    setQueryParams({ ...queryParams, keywords: event.target.value })
  }

  const handleSortBy = (event: any) => {
    const value = event.target.value.split('-')
    setQueryParams({
      ...queryParams,
      orderBy: value[0],
      orderType: value[1],
    })
  }

  const handleShowEdit = (id: string) => {
    setEditId(id)
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setEditId('')
    setShowEdit(false)
  }

  const loadData = () => {
    const url = `${process.env.API_ENDPOINT}supplier`;
    axios.get<Data>(url, {
      params: queryParams
    }).then((response) => {
      console.log(response.data)
      setData(response.data)
    })
  };

  useEffect(() => {
    loadData();
    // TODO: when error api
  }, [queryParams])

  return (
    <>
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
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                onChange={handleSearch}
              />
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
              Object.values(data.data).map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>
                      {(queryParams.page-1) * queryParams.limit + index + 1}
                    </td>
                    <td>{d.nama}</td>
                    <td>{d.alamat}</td>
                    <td>{d.nomor_telepon}</td>
                    <td>

                      {/* TODO: create new component for edit button */}
                      <button
                        onClick={() => handleShowEdit(d.id)}
                        className="btn btn-primary ms-3"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <DeleteComp supplier={d} loadData={loadData}/>
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
        pageCount={Math.ceil(data.total / queryParams.limit)}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination-container"
        activeClassName="selected"
        disabledClassName="disabled"
        pageLinkClassName={'pagination-item'}
      />
    </>
  )
}

export default TableSupplier
