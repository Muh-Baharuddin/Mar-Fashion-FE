import EditComp from './Components/EditComp'
import DeleteComp from './Components/DeleteComp'
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable';
import { Sale } from 'services/sale/types';
import { sale_url } from 'services/sale';
import 'bootstrap-icons/font/bootstrap-icons.css'

const tableProps: ApiTableControlProps<Sale> = {
  columns: [
    {
      label: "Invoice",
      value: "invoice",
      sort: "invoice",
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
      label: "Pelanggan",
      value: (data) => (
        <>
          {data?.customer || "-"}
        </>
      ),
      sort: "customer",
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
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp sale={data} />
          <DeleteComp sale={data} />
        </div>
      )
    },
  ],
  url: sale_url,
  orderBy: "date",
  orderType: "DESC"
};


const TableSale = () => {
  const control = new ApiTableControl<Sale>(tableProps);
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

export default TableSale
