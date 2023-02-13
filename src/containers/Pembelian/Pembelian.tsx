import { AdminLayout } from '@layouts/AdminLayout'
import { useState } from 'react'
import TablePembelian from './Table/TablePembelian'

export const DataPembelian = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <AdminLayout>
      <div className="container">
        <TablePembelian
          showAdd={showAdd}
          showEdit={showEdit}
          setShowAdd={setShowAdd}
          setShowEdit={setShowEdit}
        />
      </div>
    </AdminLayout>
  )
}
