import 'bootstrap-icons/font/bootstrap-icons.css'
import { supplier_url } from 'services/supplier';
import { ApiTable, ApiTableControl, KeywordsFilter } from '../../../components/ApiTable'
import { Supplier, } from 'services/supplier/types';
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { useState } from 'react';
import { QueryParamsType } from 'services/types';

const control = new ApiTableControl<Supplier>({
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
      label: "Barang",
      value: (data) => {
        return (
          <div>
            {data.__items__?.length > 0 ?
              data.__items__.map((item, index) => (
                <span key={index}>{item.brand}{index !== data.__items__.length - 1 ? ', ' : ''}</span>
              ))
              :
              "-"
            }
          </div>
        );
      },
      sort: "items"
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
  const [params, setParams] = useState<QueryParamsType>({
    keywords: '',
    orderBy: 'name',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  })
  return (
    <>
      <div className="card-body">
        <KeywordsFilter control={control}/>
        <ApiTable
          control={control}
          params={params}
          setParams={setParams}
        />
      </div>
    </>
  )
}

export default TableSupplier
