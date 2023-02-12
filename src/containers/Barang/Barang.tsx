import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useState } from 'react'
import TableBarang from './Table/TableBarang'
import { useCookies } from 'react-cookie'

export const Barang = () => {
  const [cookies] = useCookies(['user'])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  console.log("ini dari barang")
  return (
    <div>
    { cookies.user?.role == "ADMIN" ? 
      <AdminLayout>
        <div className="container">
          <TableBarang
            showAdd={showAdd}
            showEdit={showEdit}
            setShowAdd={setShowAdd}
            setShowEdit={setShowEdit}
          />
        </div>
      </AdminLayout> :
      <KaryawanLayout>
        <div className="container">
          <TableBarang
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
