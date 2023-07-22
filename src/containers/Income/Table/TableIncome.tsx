import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { Income } from 'services/income/types';
import { income_url } from 'services/income';

const tableProps: ApiTableControlProps<Income> = {
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
      label: "Total",
      value: (data) => {
        return `Rp. ${data.total}`
      },
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
          <EditComp income={data} />
          <DeleteComp income={data} />
        </div>
      )
    },
  ],
  url: income_url,
  orderBy: "date",
  orderType: "DESC"
};

const TableIncome = () => {
  const control = new ApiTableControl<Income>(tableProps);
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

export default TableIncome
