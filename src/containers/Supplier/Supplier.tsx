import { createContext, useContext } from 'react'
import { control } from './Table/TableSupplier'
import { ApiTableControl } from 'src/components/ApiTable';
import { Supplier } from 'services/supplier/types';
import AddComp from './Table/Components/AddComp'
import TableSupplier from './Table/TableSupplier'

interface SupplierContext {
  control: ApiTableControl<Supplier>
}

const supplierContext = createContext<SupplierContext>(undefined as unknown as SupplierContext)

export const useSupplierContext = () => {
  return useContext(supplierContext)
} 

export const DataSupplier = () => {

  return (
    <supplierContext.Provider value={{
      control, 
    }}>
      <div className="container">
        <h3>Data Supplier</h3>
        <div className="card">
          <div className="card-header">
            <AddComp/>
          </div>
          <TableSupplier />
        </div>
      </div>
    </supplierContext.Provider>
  )
}
