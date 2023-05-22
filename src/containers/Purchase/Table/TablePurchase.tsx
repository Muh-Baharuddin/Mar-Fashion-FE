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
      label: "Barang",
      value: (data) => {
        return (
          <div>
            {data.__items__?.length > 0 ?
              data.__items__.map((item: {brand: string}, index: number) => (
                <span key={index}>{item.brand}{index !== data.__items__.length - 1 ? ', ' : ''}</span>
              ))
              :
              "-"
            }
          </div>
        )
      },
      sort: "items",
    },
    {
      label: "Satuan",
      value: "unit",
      sort: "unit",
    },
    {
      label: "Jumlah",
      value: "amount",
      sort: "amount",
    },
    {
      label: "Total",
      value: "total",
      sort: "total",
    },
    {
      label: "Hutang",
      value: "debt",
      sort: "debt",
    },
    {
      label: "Supplier",
      value: (data) => (
        <div>
          {data.__supplier__?.name || "-"}
        </div>
      ),
      sort: "supplier",
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
