import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useState } from 'react'
import TableKaryawan from './Table/TableKaryawan'
import { useCookies } from 'react-cookie'

export const DataKaryawan = () => {
  const [cookies] = useCookies(['user'])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <div>
    { cookies.user?.role == "ADMIN" ? 
      <AdminLayout>
        <div className="container">
          <TableKaryawan
            showAdd={showAdd}
            showEdit={showEdit}
            setShowAdd={setShowAdd}
            setShowEdit={setShowEdit}
          />
        </div>
      </AdminLayout> :
      <KaryawanLayout>
        <div className="container">
          <TableKaryawan
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
