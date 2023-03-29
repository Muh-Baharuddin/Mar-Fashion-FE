import React from 'react'
import { ApiTableProvider } from '../../components/ApiTable';
import AddComp from './Table/Components/AddComp'
import { Sort } from './Table/Components/Sort';
import TableSupplier from './Table/TableSupplier';

export const DataSupplier = () => {
  return (
    <ApiTableProvider>
      <Sort/>
      <div className="container">
        <h3>Data Supplier</h3>
        <div className="card">
          <div className="card-header">
            <AddComp/>
          </div>
          <TableSupplier />
        </div>
      </div>
    </ApiTableProvider>
  )
}
