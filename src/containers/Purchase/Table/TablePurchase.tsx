import { usePurchaseContext } from '../Purchase';
import { CSSProperties } from "react";
import { getPurchases } from 'services/purchase';
import BeatLoader from "react-spinners/BeatLoader";
import FilterComp from './Components/FilterComp'
import EditComp from './Components/EditComp'
import DeleteComp from './Components/DeleteComp'
import PaginationComp from './Components/PaginationComp'
import 'bootstrap-icons/font/bootstrap-icons.css'

const TablePurchase = () => {
  const { queryParams, setQueryParams } = usePurchaseContext()
  const { data, error, isLoading } = getPurchases(queryParams);

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
              <th onClick={() => handleSortBy('date')}>
                Tanggal{' '}
                {queryParams.orderBy === 'date' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th>Nomor Invoice</th>
              <th onClick={() => handleSortBy('unit')}>
                Satuan{' '}
                {queryParams.orderBy === 'unit' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th>Hutang</th>
              <th onClick={() => handleSortBy('cost')}>
                Total{' '}
                {queryParams.orderBy === 'cost' && (
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
                    <td>{new Date(d.date).toISOString().split('T')[0]}</td>
                    <td>{d.invoice}</td>
                    <td>{d.unit}</td>
                    <td>{d?.debt || "-"}</td>
                    <td>{d.cost}</td>
                    <td style={{display: 'flex'}}>
                      <EditComp purchase={d} />
                      <DeleteComp purchase={d} />
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
