import { useSupplierContext } from '../Supplier'
import DeleteComp from './Components/DeleteComp'
import EditComp from './Components/EditComp'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { getSuppliers } from 'services/supplier';
import { CSSProperties, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import FilterComp from './Components/FilterComp'
import PaginationComp from './Components/PaginationComp'

const TableSupplier = () => {
  const { queryParams, setQueryParams } = useSupplierContext()
  const { data, error, isLoading } = getSuppliers(queryParams);

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

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <div className="card-body">
        <FilterComp />
        <table className="table table-bordered">
          <thead>
            <tr>
            <th>Id</th>
              <th onClick={() => handleSortBy('name')}>
                Nama{' '}
                {queryParams.orderBy === 'name' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('address')}>
                Alamat{' '}
                {queryParams.orderBy === 'address' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('city')}>
                Kota{' '}
                {queryParams.orderBy === 'city' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('phone_number')}>
                Nomor Telepon{' '}
                {queryParams.orderBy === 'phone_number' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('items')}>
                Barang{' '}
                {queryParams.orderBy === 'items' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('account_number')}>
                Nomor Rekening{' '}
                {queryParams.orderBy === 'account_number' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('account_owner')}>
                Rekening Atas Nama{' '}
                {queryParams.orderBy === 'account_owner' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('bank')}>
                Bank{' '}
                {queryParams.orderBy === 'bank' && (
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
              <tr>
                <td colSpan={5} style={{ textAlign:'center' }}>
                  <BeatLoader 
                    color='silver'
                    cssOverride={override}
                    size={15}
                  />
                </td>
              </tr>
            ) : data && (
              Object.values(data.data).map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>
                      {(queryParams.page-1) * queryParams.limit + index + 1}
                    </td>
                    <td>{d.name}</td>
                    <td>{d.address}</td>
                    <td>{d.city}</td>
                    <td>{d.phone_number}</td>
                    <td>
                      {d.__items__?.length > 0 ?
                        d.__items__.map((items: {brand: string}, index: number) => (
                          <span key={index}>{items.brand}{index !== d.__items__.length - 1 ? ', ' : ''}</span>
                        ))
                        : "-"
                      }
                    </td>
                    <td>{d.account_number}</td>
                    <td>{d.account_owner}</td>
                    <td>{d.bank}</td>
                    <td style={{display: 'flex'}}>
                      <EditComp supplier={d} />
                      <DeleteComp supplier={d} />
                    </td>
                  </tr>
                )
              }))}
          </tbody>
        </table>
        <div className="pagination-container">
          <PaginationComp data={data}/>
        </div>
      </div>
    </>
  )
}

export default TableSupplier
