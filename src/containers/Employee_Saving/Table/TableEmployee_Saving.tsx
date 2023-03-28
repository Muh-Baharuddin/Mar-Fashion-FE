import 'bootstrap-icons/font/bootstrap-icons.css'
import { ApiTable, ApiTableControl, KeywordsFilter } from '../../../components/ApiTable'
import { useEmployeeSavingContext } from '../Employee_Saving';
import { EmployeeSaving } from 'services/employee/types';
import { employeeSaving_url } from 'services/employee';

const control = new ApiTableControl<EmployeeSaving>({
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
    
  ],
  url: employeeSaving_url,
});

const TableEmployeeSaving = () => {
  const { queryParams, setQueryParams } = useEmployeeSavingContext()
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

export default TableEmployeeSaving
