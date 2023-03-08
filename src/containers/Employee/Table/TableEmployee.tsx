import { useEmployeeContext } from '../Employee';
import { getEmployees } from 'services/employee';
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import 'bootstrap-icons/font/bootstrap-icons.css'
import FilterComp from './Components/FilterComp';
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';

const TableEmployee = () => {
  const { queryParams, setQueryParams } = useEmployeeContext()
  const { data, error, isLoading } = getEmployees(queryParams);

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
              <th onClick={() => handleSortBy('entry_date')}>
                Tanggal Masuk{' '}
                {queryParams.orderBy === 'entry_date' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('exit_date')}>
                Tanggal Keluar{' '}
                {queryParams.orderBy === 'exit_date' && (
                  <i
                    className={`bi bi-caret-${
                      queryParams.orderType === 'ASC' ? 'down' : 'up'
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSortBy('total_saving')}>
                Total Tabungan{' '}
                {queryParams.orderBy === 'total_saving' && (
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
                    <td>{d.phone_number}</td>
                    <td>{new Date(d.entry_date).toISOString().split('T')[0]}</td>
                    <td>{d.exit_date ? new Date(d.exit_date).toISOString().split('T')[0] : "-"}</td>
                    <td>{d.total_saving}</td>
                    <td style={{display: 'flex'}}>
                      <EditComp employee={d} />
                      <DeleteComp employee={d} />
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

export default TableEmployee
