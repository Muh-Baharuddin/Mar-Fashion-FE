import React from 'react'
import AddCategoryComp from './Table/Components/AddComp'
import TableCategory from './Table/TableCategory';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataCategory = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Kategori Barang</h3>
          <div className="card">
            <div className="card-header">
              <AddCategoryComp />
            </div>
            <TableCategory />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}