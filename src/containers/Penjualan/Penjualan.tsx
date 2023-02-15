import { useState } from 'react'
import TablePenjualan from './Table/TablePenjualan'

export const DataPenjualan = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  return (
    <TablePenjualan
      showAdd={showAdd}
      showEdit={showEdit}
      setShowAdd={setShowAdd}
      setShowEdit={setShowEdit}
    />
  )
}
