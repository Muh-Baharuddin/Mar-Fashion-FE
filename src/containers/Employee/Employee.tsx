import { createContext, useContext, useState } from 'react'
import { Employee } from 'services/employee/types';
import { ApiTableControl } from 'src/components/ApiTable';
import { control } from './Table/TableEmployee'
import TableEmployee from './Table/TableEmployee';
import AddComp from './Table/Components/AddComp'

interface EmployeeContext {
  control: ApiTableControl<Employee>
}

const employeeContext = createContext<EmployeeContext>(undefined as unknown as EmployeeContext)

export const useEmployeeContext = () => {
  return useContext(employeeContext)
} 

export const DataEmployee = () => {

  return (
    <employeeContext.Provider value={{
      control,
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
