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
    orderBy: 'nama',
    orderType: 'ASC',
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
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  return (
    <penjualanContext.Provider value={{
      queryParams,
      setQueryParams,
    }}>
      <TablePenjualan
      showAdd={showAdd}
      showEdit={showEdit}
      setShowAdd={setShowAdd}
      setShowEdit={setShowEdit}
      />
    </penjualanContext.Provider>
  )
}
