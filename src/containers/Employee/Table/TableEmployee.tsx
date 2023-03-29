import 'bootstrap-icons/font/bootstrap-icons.css'
import { ApiTable, ApiTableControl, KeywordsFilter } from '../../../components/ApiTable'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { useEmployeeContext } from '../Employee';
import { Employee } from 'services/employee/types';
import { employee_url } from 'services/employee';

const control = new ApiTableControl<Employee>({
  columns: [
    {
      label: "Nama",
      value: "name",
      sort: "name",
    },
    {
      label: "Alamat",
      value: "address",
      sort: "address",
    },
    {
      label: "Nomor Telepon",
      value: "phone_number",
      sort: "phone_number",
    },
    {
      label: "Tanggal Masuk",
      value: (data) => (
        <div>
          {new Date(data.entry_date).toISOString().split('T')[0]}
        </div>
      ),
      sort: "entry_date",
    },
    {
      label: "Tanggal Keluar",
      value: (data) => (
        <div>
          {data.exit_date ? new Date(data.exit_date).toISOString().split('T')[0] : "-"}
        </div>
      ),
      sort: "exit_date",
    },
    {
      label: "Total Tabungan",
      value: "total_saving",
      sort: "total_saving",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp employee={data} />
          <DeleteComp employee={data} />
        </div>
      )
    },
  ],
  url: employee_url,
});

const TableEmployee = () => {
  const { queryParams, setQueryParams } = useEmployeeContext()
  return (
    <>
      <div className="card-body">
        <KeywordsFilter control={control}/>
        <ApiTable
          control={control}
          params={queryParams}
          setParams={setQueryParams}
        />
      </div>
    </>
  )
}

export default TableEmployee
