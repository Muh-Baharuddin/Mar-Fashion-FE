import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useCookies } from 'react-cookie'
import TableAkun from './Table/TableAkun'

export const DataAkun = () => {
  const [cookies] = useCookies(['user'])
  return (
    <div>
    { cookies.user?.role == "ADMIN" ? 
      <AdminLayout>
        <div className="container">
          <TableAkun />
        </div>
      </AdminLayout> :
      <KaryawanLayout>
        <div className="container">
          <TableAkun />
        </div>
      </KaryawanLayout>
    }
    </div>
  )
}
