import { useSupplierContext } from '../Supplier'
import Pagination from 'react-paginate'
import DeleteComp from './Components/DeleteComp'
import EditComp from './Components/EditComp'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { getSuppliers } from 'services/supplier';
import FilterComp from './Components/FilterComp'

const TableSupplier = () => {
  const { queryParams, setQueryParams } = useSupplierContext()
  const { data, error, isLoading } = getSuppliers(queryParams);

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setQueryParams((prev) => {
      return { ...prev, page: selectedPage+1};
    });
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

  return (
    <>
      <div className="card-body">
        <FilterComp />
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
            { isLoading ? (
              <tr><td>Loading</td></tr>
            ) : data && (
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
              }))}
          </tbody>
        </table>
      </div>
      <Pagination
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={!data? 0 : Math.ceil(data.total / queryParams.limit)}
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
