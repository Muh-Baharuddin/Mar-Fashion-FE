import React from 'react'
import AddComp from './Table/Components/AddComp'
import TableEmployee from './Table/TableEmployee';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataEmployee = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Karyawan</h3>
          <div className="card">
            <div className="card-header">
              <AddComp />
            </div>
            <TableEmployee />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}
