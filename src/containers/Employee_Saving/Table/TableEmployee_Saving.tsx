import 'bootstrap-icons/font/bootstrap-icons.css'
import { ApiTable, ApiTableControl, KeywordsFilter } from '../../../components/ApiTable'
import { useEmployeeSavingContext } from '../Employee_Saving';
import { EmployeeSaving } from 'services/employee/types';
import { employeeSaving_url } from 'services/employee';
import EditEmployeeSaving from './Components/EditEmployeeSaving';
import DeleteEmployeeSaving from './Components/DeleteEmployeeSaving';

export const control = new ApiTableControl<EmployeeSaving>({
  columns: [
    {
      label: "Tanggal",
      value: (data) => (
        <div>
          {new Date(data.date).toISOString().split('T')[0]}
        </div>
      ),
      sort: "date",
    },
    {
      label: "Karyawan",
      value: (data) => (
        <div>
          {data.__employee__?.name}
        </div>
      ),
      sort: "employee",
    },
    {
      label: "Tipe",
      value: "type",
      sort: "type",
    },
    {
      label: "Total",
      value: "total",
      sort: "total",
    },
    {
      label: "Keterangan",
      value: "description",
      sort: "description",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditEmployeeSaving employeeSaving={data} />
          <DeleteEmployeeSaving employeeSaving={data} />
        </div>
      )
    },
  ],
  url: employeeSaving_url,
  orderBy: "date",
  orderType: "DESC"
});

const TableEmployeeSaving = () => {

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

export default TableEmployeeSaving
