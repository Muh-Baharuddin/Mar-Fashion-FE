import { createContext, useContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
import AddComp from './Table/Components/AddComp'
import TableSupplier from './Table/TableSupplier'
import 'react-toastify/dist/ReactToastify.css';

interface supplierContext {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const defaultState = {
  queryParams: {
    keywords: '',
    orderBy: 'name',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  },
  setQueryParams: () => {},
}

const supplierContext = createContext<supplierContext>(defaultState)

export const useSupplierContext = () => {
  return useContext(supplierContext)
} 

export const DataSupplier = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)

  return (
    <supplierContext.Provider value={{
      queryParams,
      setQueryParams,
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
