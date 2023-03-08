import { createContext, useContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
import AddComp from './Table/Components/AddComp'
import TablePurchase from './Table/TablePurchase';
import 'react-toastify/dist/ReactToastify.css';

interface supplierContext {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const defaultState = {
  queryParams: {
    keywords: '',
    orderBy: 'nama',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  },
  setQueryParams: () => {},
}

const purchaseContext = createContext<supplierContext>(defaultState)

export const useSupplierContext = () => {
  return useContext(purchaseContext)
} 

export const DataPurchase = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)

  return (
    <purchaseContext.Provider value={{
      queryParams,
      setQueryParams,
    }}>
      <div className="container">
        <h3>Data Pembelian</h3>
        <div className="card">
          <div className="card-header">
            <AddComp />
          </div>
          <TablePurchase />
        </div>
      </div>
    </purchaseContext.Provider>
  )
}
