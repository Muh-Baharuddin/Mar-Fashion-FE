import React from 'react'
import AddComp from './Table/Components/AddComp';
import TableItem from './Table/TableItem';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataItem = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Barang</h3>
          <div className="card">
            <div className="card-header">
              <AddComp />
            </div>
            <TableItem />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}
