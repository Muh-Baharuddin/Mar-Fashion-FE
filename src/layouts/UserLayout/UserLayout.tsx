import { PropsWithChildren, useEffect } from 'react'
import { AdminLayout } from '@layouts/AdminLayout'
import { KaryawanLayout } from '@layouts/KaryawanLayout'
import { useMarContext } from 'src/context/MarFashionProvider'
import { useRouter } from 'next/router'

export const UserLayout = ({ children }: PropsWithChildren) => {
  const { user } = useMarContext()
  const router = useRouter()

  useEffect(() => {
    if(user === undefined) {
      router.push('/login', undefined, { shallow: true })
    }
  }, [])
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
