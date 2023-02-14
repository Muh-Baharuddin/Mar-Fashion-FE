import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { DataKaryawan } from '../containers/Karyawan'
import { useMarContext } from 'src/context/MarFashionProvider'

const DataKaryawanPage = () => {
  const { user } = useMarContext()
  return (
    <div>
      { user?.role == "ADMIN" ? 
        <AdminLayout>
          <DataKaryawan />
        </AdminLayout> :
        <KaryawanLayout>
          <DataKaryawan />
        </KaryawanLayout>
      }
    </div>
  )
}

export default DataKaryawanPage
