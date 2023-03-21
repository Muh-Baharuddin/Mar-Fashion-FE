import { createContext, useContext, useState } from 'react'
import { ContextInterface, QueryParamsType } from 'services/types';
import TableEmployee from './Table/TableEmployee';
import AddComp from './Table/Components/AddComp'
import 'react-toastify/dist/ReactToastify.css';

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

const employeeContext = createContext<ContextInterface>(defaultState)

export const useEmployeeContext = () => {
  return useContext(employeeContext)
} 

export const DataEmployee = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)

  return (
    <employeeContext.Provider value={{
      queryParams,
      setQueryParams,
    }}>
      <div className="container">
        <h3>Data Karyawan</h3>
        <div className="card">
          <div className="card-header">
            <AddComp />
          </div>
          <TableEmployee />
        </div>
      </div>
    </employeeContext.Provider>
  )
}
