import { useState } from 'react'
import AddComp from './Components/AddComp'
import TableSupplier from './Table/TableSupplier'

export const DataSupplier = () => {
  const [showEdit, setShowEdit] = useState(false)
  return (
    <div className="container">
      <h3>Data Supplier</h3>
      <div className="card">
        <div className="card-header">
          <AddComp />
        </div>
        <TableSupplier
          showEdit={showEdit}
          setShowEdit={setShowEdit}
        />
      </div>
      
    </div>
  )
}
