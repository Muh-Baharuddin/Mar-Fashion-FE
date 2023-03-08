import { useEmployeeContext } from '../Employee';
import { getEmployees } from 'services/employee';
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import 'bootstrap-icons/font/bootstrap-icons.css'

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
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Nomor Telepon</th>
              <th>Tanggal Masuk</th>
              <th>Tanggal Keluar</th>
              <th>Total Tabungan</th>
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
                    <td>{d.entry_date.toLocaleDateString()}</td>
                    <td>{d.exit_date.toLocaleDateString()}</td>
                    <td>{d.total_saving}</td>
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
