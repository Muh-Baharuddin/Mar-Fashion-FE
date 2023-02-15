import { PropsWithChildren } from 'react'
import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useMarContext } from 'src/context/MarFashionProvider'

export const UserLayout = ({ children }: PropsWithChildren) => {
  const { user } = useMarContext()
  return (
    <div>
      { user?.role == "ADMIN" ?
        <AdminLayout>
          {children}
        </AdminLayout> :
        <KaryawanLayout>
          {children}
        </KaryawanLayout>
      }
    </div>
  )
}
