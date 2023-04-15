import React from 'react'
import AddComp from './Table/Components/AddComp'
import TableCustomer_Complaint from './Table/TableCustome_Complaint';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataCoomplaint = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Keluhan Pelanggan</h3>
          <div className="card">
            <div className="card-header">
              <AddComplaintComp />
            </div>
            <TableCustomer_Complaint />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}