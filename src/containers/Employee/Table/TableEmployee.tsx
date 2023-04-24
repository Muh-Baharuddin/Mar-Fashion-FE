import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { Employee } from 'services/employee/types';
import { employee_url } from 'services/employee';

const tableProps: ApiTableControlProps<Employee> = {
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
        <>
          {new Date(data.entry_date).toLocaleDateString('id-ID')}
        </>
      ),
      sort: "entry_date",
    },
    {
      label: "Tanggal Keluar",
      value: (data) => (
        <>
          {data.exit_date ? new Date(data.exit_date).toLocaleDateString('id-ID') : "-"}
        </>
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
  orderBy: "name",
  orderType: "ASC"
};

const TableEmployee = () => {
  const control = new ApiTableControl<Employee>(tableProps);
  return (
    <>
      <div className="card-body">
        <KeywordsFilter control={control}/>
        <ApiTable
          control={control}
        />
      </div>
    </>
  )
}

export default TableEmployee
