import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useMarContext } from 'src/context/MarFashionProvider'
import { DataPenjualan } from '../containers/Penjualan'

const NotaPenjualanPage = () => {
  const { user } = useMarContext()
  return (
    <div>
      { user?.role == "ADMIN" ?
        <AdminLayout>
          <DataPenjualan />
        </AdminLayout> :
        <KaryawanLayout>
          <DataPenjualan />
        </KaryawanLayout>
      }
    </div>
  )
}

export default NotaPenjualanPage
