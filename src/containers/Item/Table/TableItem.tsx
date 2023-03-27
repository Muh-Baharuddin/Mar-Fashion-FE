import 'bootstrap-icons/font/bootstrap-icons.css'
import { item_url } from 'services/item';
import { ApiTable, ApiTableControl, KeywordsFilter } from '../../../components/ApiTable'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { Item } from 'services/item/types';
import { useState } from 'react';
import { QueryParamsType } from 'services/types';

const control = new ApiTableControl<Item>({
  columns: [
    {
      label: "Merek",
      value: "brand",
      sort: "brand",
    },
    {
      label: "Kategori",
      value: (data) => {
        return (
          <div>
            {data.__categories__?.length > 0 ?
              data.__categories__.map((category: {name: string}, index: number) => (
                <span key={index}>{category.name}{index !== data.__categories__.length - 1 ? ', ' : ''}</span>
              ))
              :
              "-"
            }
          </div>
        )
      },
      sort: "category",
    },
    {
      label: "Harga Modal",
      value: "capital_price",
      sort: "capital_price",
    },
    {
      label: "Harga Grosir",
      value: "wholescale_price",
      sort: "wholescale_price",
    },
    {
      label: "Stok",
      value: "stock",
      sort: "stock",
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
          <EditComp item={data} />
          <DeleteComp item={data} />
        </div>
      )
    },
  ],
  url: item_url,
});

const TableItem = () => {
  const [params, setParams] = useState<QueryParamsType>({
    keywords: '',
    orderBy: 'brand',
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

export default TableItem
