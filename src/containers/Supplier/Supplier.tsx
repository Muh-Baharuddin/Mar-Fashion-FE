import { createContext, useContext, useState } from 'react'
import { QueryParamsType } from 'src/@types/user'
import AddComp from './Table/Components/AddComp'
import TableSupplier from './Table/TableSupplier'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAll } from 'services/supplier'
import { Data } from 'services/supplier/types';

interface supplierContext {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
  refreshSupplier: () => void;
}

const defaultState = {
  data: { data: [], total: 0 },
  setData: () => {},
  queryParams: {
    keywords: '',
    orderBy: 'nama',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  },
  setQueryParams: () => {},
  refreshSupplier: () => {},
}

const supplierContext = createContext<supplierContext>(defaultState)

export const useSupplierContext = () => {
  return useContext(supplierContext)
} 

export const DataSupplier = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)
  const [data, setData] = useState<Data>({
    data: [],
    total: 0,
  });

  const refreshSupplier = () => {
    getAll(queryParams)
    .then((response) => {
      setData(response.data);
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    })

    // api.get<Data>('supplier', {
    //   params: queryParams
    // }).then((response) => {
    //   setData(response.data);
    // }).catch(() => {
    //   toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    // })
    
    // const url = `${process.env.API_ENDPOINT}supplier`;
    // axios.get<Data>(url, {
    //   params: queryParams
    // }).then((response) => {
    //   setData(response.data);
    // }).catch(() => {
    //   toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    // })
  };

  return (
    <supplierContext.Provider value={{
      data,
      setData,
      queryParams,
      setQueryParams,
      refreshSupplier,
    }}>
      <div className="container">
        <h3>Data Supplier</h3>
        <div className="card">
          <div className="card-header">
            <AddComp />
          </div>
          <TableSupplier />
        </div>
      </div>
    </supplierContext.Provider>
  )
}
