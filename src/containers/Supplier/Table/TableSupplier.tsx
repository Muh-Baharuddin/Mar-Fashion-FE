import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'react-paginate'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { QueryParamsType } from 'src/@types/user'
import DeleteComp from './Components/DeleteComp'
import EditComp from './Components/EditComp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const TableSupplier = () => {
  const [data, setData] = useState<Data>({
    data: [],
    total: 0,
  });
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    keywords: '',
    orderBy: 'nama',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  })

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setQueryParams((prev) => {
      return { ...prev, page: selectedPage+1};
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, keywords: event.target.value })
  }

  const handleSortBy = (column: string) => {
    let newOrderType = 'ASC';
    if (column === queryParams.orderBy && queryParams.orderType === 'ASC') {
      newOrderType = 'DESC';
    }
    setQueryParams({
      ...queryParams,
      orderBy: column,
      orderType: newOrderType,
    });
  };

  const refreshSupplier = () => {
    const url = `${process.env.API_ENDPOINT}supplier`;
    axios.get<Data>(url, {
      params: queryParams
    }).then((response) => {
      setData(response.data);
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    })
  };

  useEffect(() => {
    refreshSupplier();
  }, [queryParams])

  return (
    <>
      <div className="card-body">
        <div className="row mb-2">
          <div className="search-bar col-12 col-md-4">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
            <th>Id</th>
              <th onClick={() => handleSortBy('nama')}>
                Nama{' '}
                {queryParams.orderBy === 'nama' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('alamat')}>
                Alamat{' '}
                {queryParams.orderBy === 'alamat' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('nomor_telepon')}>
                Nomor Telepon{' '}
                {queryParams.orderBy === 'nomor_telepon' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
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
                      <EditComp supplier={d} refreshSupplier={refreshSupplier}/>
                      <DeleteComp supplier={d} refreshSupplier={refreshSupplier}/>
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
