import { purchase_url } from 'services/purchase';
import EditComp from './Components/EditComp'
import DeleteComp from './Components/DeleteComp'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Purchase } from 'services/purchase/types';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from 'src/components/ApiTable';

const tableProps: ApiTableControlProps<Purchase> = {
  columns: [
    {
      label: "Invoice",
      value: "invoice",
      sort: "Invoice",
    },
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
      value: "cost",
      sort: "cost",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp purchase={data} />
          <DeleteComp purchase={data} />
        </div>
      )
    },
  ],
  url: purchase_url,
  orderBy: "date",
  orderType: "DESC"
};


const TablePurchase = () => {
  const control = new ApiTableControl<Purchase>(tableProps);
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

export default TablePurchase
