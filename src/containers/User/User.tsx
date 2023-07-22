import React from 'react'
import TableUser from './Table/TableUser';
import { ApiTableProvider } from '../../components/ApiTable';
import { DynamicFormProvider } from '../../components/DynamicForm';

export const DataUser = () => {
  return (
    <ApiTableProvider>
      <DynamicFormProvider>
        <div className="container">
          <h3>Data User</h3>
          <div className="card">
            <TableUser />
          </div>
        </div>
      </DynamicFormProvider>
    </ApiTableProvider>
  )
}