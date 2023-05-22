import React from 'react'
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';
import AddComp from './Table/Components/AddComp'
import TablePurchase from './Table/TablePurchase';
import 'react-toastify/dist/ReactToastify.css';

export const DataPurchase = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Pembelian</h3>
          <div className="card">
            <div className="card-header">
              <AddComp />
            </div>
            <TablePurchase />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}
