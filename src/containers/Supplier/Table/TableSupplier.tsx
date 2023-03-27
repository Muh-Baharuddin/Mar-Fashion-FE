import 'bootstrap-icons/font/bootstrap-icons.css'
import { supplier_url } from 'services/supplier';
import { ApiTable, ApiTableControl, KeywordsFilter } from '../../../components/ApiTable'
import { Supplier, } from 'services/supplier/types';
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';

const control = new ApiTableControl<Supplier>({
  columns: [
    {
      label: "Nama",
      value(data) {
        return `Rp. ${data.name} ${data.city}`
      },
      sort: "name",
    },
    {
      label: "Alamat",
      value: "address",
      sort: "address",
    },
    {
      label: "Kota",
      value: "city",
      sort: "city",
    },
    {
      label: "Nomor Telepon",
      value: "phone_number",
      sort: "phone_number",
    },
    {
      label: "Nomor Rekening",
      value: "account_number",
      sort: "account_number",
    },
    {
      label: "Rekening Atas Nama",
      value: "account_owner",
      sort: "account_owner",
    },
    {
      label: "Bank",
      value: "bank",
      sort: "bank",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp supplier={data} />
          <DeleteComp supplier={data} />
        </div>
      )
    },
  ],
  url: supplier_url,
});

const TableSupplier = () => {
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

export default TableSupplier
