import { useState } from 'react'
import TableSupplier from './Table/TableSupplier'

export const DataSupplier = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <div className="container">
      <TableSupplier
        showAdd={showAdd}
        showEdit={showEdit}
        setShowAdd={setShowAdd}
        setShowEdit={setShowEdit}
      />
    </div>
  )
}
