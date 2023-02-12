import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import TableRetur from './Table/TableRetur'

export const DataRetur = () => {
  const [cookies] = useCookies(['user'])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <div>
    { cookies.user?.role == "ADMIN" ? 
      <AdminLayout>
        <div className="container">
          <TableRetur
            showAdd={showAdd}
            showEdit={showEdit}
            setShowAdd={setShowAdd}
            setShowEdit={setShowEdit}
          />
        </div>
      </AdminLayout> :
      <KaryawanLayout>
        <div className="container">
          <TableRetur
            showAdd={showAdd}
            showEdit={showEdit}
            setShowAdd={setShowAdd}
            setShowEdit={setShowEdit}
          />
        </div>
      </KaryawanLayout>
    }
    </div>
  )
}
