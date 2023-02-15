import { useState } from 'react'
import { TableKaryawan } from './Table/TableKaryawan'

export const DataKaryawan = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  return (
    <div className="container">
      <TableKaryawan
        showAdd={showAdd}
        showEdit={showEdit}
        setShowAdd={setShowAdd}
        setShowEdit={setShowEdit}
      />
    </div>
  )
}
