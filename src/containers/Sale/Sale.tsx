import React from 'react'
import AddComp from './Table/Components/AddComp'
import TableSale from './Table/TableSale';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataSale = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Penjualan</h3>
          <div className="card">
            <div className="card-header">
              <AddComp />
            </div>
            <TableSale />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}
