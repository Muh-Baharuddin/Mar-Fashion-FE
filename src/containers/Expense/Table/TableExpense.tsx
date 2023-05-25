import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { Expense } from 'services/expense/types';
import { expense_url } from 'services/expense';

const tableProps: ApiTableControlProps<Expense> = {
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
      value: "total",
      sort: "total",
    },
    {
      label: "Keluhan",
      value: "description",
      sort: "description",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp expense={data} />
          <DeleteComp expense={data} />
        </div>
      )
    },
  ],
  url: expense_url,
  orderBy: "date",
  orderType: "DESC"
};

const TableExpense = () => {
  const control = new ApiTableControl<Expense>(tableProps);
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

export default TableExpense
