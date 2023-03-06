import { useItemContext } from '../Item'
import { getItems } from 'services/item'
import { CSSProperties } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import 'bootstrap-icons/font/bootstrap-icons.css'
import FilterComp from './Components/FilterComp';
import EditComp from './Components/EditComp';

const TableItem = () => {
  const { queryParams, setQueryParams } = useItemContext()
  const { data, error, isLoading } = getItems(queryParams);

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
              <th onClick={() => handleSortBy('brand')}>
                Merek{' '}
                {queryParams.orderBy === 'brand' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('capital_price')}>
                Harga Modal{' '}
                {queryParams.orderBy === 'capital_price' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('wholescale_price')}>
                Harga Grosir{' '}
                {queryParams.orderBy === 'wholescale_price' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('stock')}>
                Stok{' '}
                {queryParams.orderBy === 'stock' && (
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
                    <td>{d.brand}</td>
                    <td>{d.capital_price}</td>
                    <td>{d.wholescale_price}</td>
                    <td>{d.stock}</td>
                    <td>
                      <EditComp item={d} />
                    </td>
                  </tr>
                )
              }))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableItem
