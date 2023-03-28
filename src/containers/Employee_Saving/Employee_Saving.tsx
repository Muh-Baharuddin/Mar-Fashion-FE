import { createContext, useContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
// import AddComp from './Table/Components/AddComp';
import TableEmployeeSaving from './Table/TableEmployee_Saving';

interface EmployeeSavingContextType {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const defaultState = {
  queryParams: {
    keywords: '',
    orderBy: 'date',
    orderType: 'DESC',
    page: 1,
    limit: 10,
  },
  setQueryParams: () => {},
}

const employeeSavingContext = createContext<EmployeeSavingContextType>(defaultState)

export const useEmployeeSavingContext = () => {
  return useContext(employeeSavingContext)
} 

export const DataEmployeeSaving = () => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>(defaultState.queryParams)
  return (
    <employeeSavingContext.Provider value={{
      queryParams,
      setQueryParams,
    }}>
      <div className="container">
        <h3>Data Simpanan Ambilan Karyawan</h3>
        <div className="card">
          <div className="card-header">
            {/* <AddComp /> */}
          </div>
          <TableEmployeeSaving />
        </div>
      </div>
    </employeeSavingContext.Provider>
  )
}
