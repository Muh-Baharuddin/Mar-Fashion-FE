import React from 'react'
import AddIncomeComp from './Table/Components/AddComp'
import TableIncome from './Table/TableIncome';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataIncome = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Keluhan Pelanggan</h3>
          <div className="card">
            <div className="card-header">
              <AddIncomeComp />
            </div>
            <TableIncome />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}