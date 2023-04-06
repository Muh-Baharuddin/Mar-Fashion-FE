import React from 'react'
import AddComp from './Table/Components/AddComp'
import TableSupplier from './Table/TableSupplier';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataSupplier = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Supplier</h3>
          <div className="card">
            <div className="card-header">
              <AddComp/>
            </div>
            <TableSupplier />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}
