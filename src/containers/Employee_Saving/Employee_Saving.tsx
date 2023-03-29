import { createContext, useContext, useState } from 'react'
import { EmployeeSaving } from 'services/employee/types';
import { control } from './Table/TableEmployee_Saving';
import { ApiTableControl } from 'src/components/ApiTable';
import AddEmployeeSaving from './Table/Components/AddEmployeeSaving';
import TableEmployeeSaving from './Table/TableEmployee_Saving';

interface EmployeeSavingContextType {
  control: ApiTableControl<EmployeeSaving>
}

const employeeSavingContext = createContext<EmployeeSavingContextType>(undefined as unknown as EmployeeSavingContextType)

export const useEmployeeSavingContext = () => {
  return useContext(employeeSavingContext)
} 

export const DataEmployeeSaving = () => {

  return (
    <employeeSavingContext.Provider value={{
      control,
    }}>
      <div className="container">
        <h3>Data Tabungan Karyawan</h3>
        <div className="card">
          <div className="card-header">
            <AddEmployeeSaving />
          </div>
          <TableEmployeeSaving />
        </div>
      </div>
    </employeeSavingContext.Provider>
  )
}
