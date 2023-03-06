import { createContext, useContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
import TablePenjualan from './Table/TablePenjualan'

interface penjualanContext {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const defaultState = {
  queryParams: {
    keywords: '',
    orderBy: 'tanggal',
    orderType: 'DESC',
    page: 1,
    limit: 10,
  },
  setQueryParams: () => {},
}

const penjualanContext = createContext<penjualanContext>(defaultState)

export const usePenjualanContext = () => {
  return useContext(penjualanContext)
} 

export const DataPenjualan = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)

  return (
    <penjualanContext.Provider value={{
      queryParams,
      setQueryParams,
    }}>
      <div className="container">
        <h3>Data Penjualan</h3>
        <div className="card">
          <div className="card-header">
          </div>
          <TablePenjualan />
        </div>
      </div>
    </penjualanContext.Provider>
  )
}
