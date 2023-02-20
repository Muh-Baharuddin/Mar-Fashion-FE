import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { useSupplierContext } from '../Supplier'
import Pagination from 'react-paginate'
import DeleteComp from './Components/DeleteComp'
import EditComp from './Components/EditComp'
import 'bootstrap-icons/font/bootstrap-icons.css'

const TableSupplier = () => {
  const { data, queryParams, setQueryParams, refreshSupplier } = useSupplierContext()

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

  useEffect(() => {
    refreshSupplier();
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
                      <EditComp supplier={d} />
                      <DeleteComp supplier={d} />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <ToastContainer />
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
