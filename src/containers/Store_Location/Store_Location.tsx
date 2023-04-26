import React from 'react'
import AddComplaintComp from './Table/Components/AddComp'
import TableCustomer_Complaint from './Table/TableStore_Location';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataStoreLocation = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data Lokasi Toko</h3>
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