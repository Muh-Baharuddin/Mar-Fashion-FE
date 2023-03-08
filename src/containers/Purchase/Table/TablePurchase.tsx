import { usePurchaseContext } from '../Purchase';
import DeleteComp from './Components/DeleteComp'
import EditComp from './Components/EditComp'
import { getSuppliers } from 'services/supplier';
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import FilterComp from './Components/FilterComp'
import PaginationComp from './Components/PaginationComp'
import 'bootstrap-icons/font/bootstrap-icons.css'

const TablePurchase = () => {
  const { queryParams, setQueryParams } = usePurchaseContext()
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
                    <td>{d.nama}</td>
                    <td>{d.alamat}</td>
                    <td>{d.nomor_telepon}</td>
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

export default TablePurchase
