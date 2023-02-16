import React, {
  PropsWithChildren, useCallback, useEffect, useState,
} from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useRouter } from 'next/router'
import Sidebar, { SidebarOverlay } from '@layouts/AdminLayout/Sidebar/Sidebar'
import Header from '@layouts/AdminLayout/Header/Header'
import Footer from '@layouts/AdminLayout/Footer/Footer'
import { Container } from 'react-bootstrap'
import { useMarContext } from 'src/context/MarFashionProvider'



export default function AdminLayout({ children }: PropsWithChildren) {
  const { user } = useMarContext();
  const router = useRouter()

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login', undefined, { shallow: true })
  //   }
  // }, [])

  // Show status for xs screen
  const [isShowSidebar, setIsShowSidebar] = useState(false)

  // Show status for md screen and above
  const [isShowSidebarMd, setIsShowSidebarMd] = useState(true)

  const toggleIsShowSidebar = () => {
    setIsShowSidebar(!isShowSidebar)
  }

  const toggleIsShowSidebarMd = () => {
    const newValue = !isShowSidebarMd
    localStorage.setItem('isShowSidebarMd', newValue ? 'true' : 'false')
    setIsShowSidebarMd(newValue)
  }

  // Clear and reset sidebar
  const resetIsShowSidebar = () => {
    setIsShowSidebar(false)
  }

  const onResize = useCallback(() => {
    resetIsShowSidebar()
  }, [])

  const { ref } = useResizeDetector({ onResize })

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem('isShowSidebarMd')) {
      setIsShowSidebarMd(localStorage.getItem('isShowSidebarMd') === 'true')
    }
  }, [setIsShowSidebarMd])

  return (
    <>
      <div ref={ref} className="position-absolute w-100" />
        <Sidebar isShow={isShowSidebar} isShowMd={isShowSidebarMd} />
      
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header toggleSidebar={toggleIsShowSidebar} toggleSidebarMd={toggleIsShowSidebarMd} />
        <div className="body flex-grow-1 px-3">
          <Container fluid="lg">
            {children}
          </Container>
        </div>
        <Footer />
      </div>

      <SidebarOverlay isShowSidebar={isShowSidebar} toggleSidebar={toggleIsShowSidebar} />
    </>
  )
}
