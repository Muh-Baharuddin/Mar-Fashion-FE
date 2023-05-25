import React from 'react'
import AddExpenseComp from './Table/Components/AddComp'
import TableExpense from './Table/TableExpense';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataExpense = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Keluhan Pelanggan</h3>
          <div className="card">
            <div className="card-header">
              <AddExpenseComp />
            </div>
            <TableExpense />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}