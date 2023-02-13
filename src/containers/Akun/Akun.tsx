import { AdminLayout } from '@layouts/AdminLayout'
import { useState } from 'react'
import TableAkun from './Table/TableAkun'

export const DataAkun = () => {
  const [showEdit, setShowEdit] = useState(false)
  return (
    <div>
      <AdminLayout>
        <div className="container">
          <TableAkun
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        </div>
      </AdminLayout>
    </div>
  )
}
