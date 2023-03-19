import { createContext, useContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
import AddComp from './Table/Components/AddComp';
import TableItem from './Table/TableItem';

interface ItemContext {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const defaultState = {
  queryParams: {
    keywords: '',
    orderBy: 'brand',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  },
  setQueryParams: () => {},
}

const itemContext = createContext<ItemContext>(defaultState)

export const useItemContext = () => {
  return useContext(itemContext)
} 

export const DataItem = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)
  return (
    <itemContext.Provider value={{
      queryParams,
      setQueryParams,
    }}>
      <div className="container">
        <h3>Data Barang</h3>
        <div className="card">
          <div className="card-header">
            <AddComp />
          </div>
          <TableItem />
        </div>
      </div>
    </itemContext.Provider>
  )
}
