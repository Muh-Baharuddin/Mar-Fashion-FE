import { useState } from 'react'
import NavbarComp from 'src/components/Navbar/NavbarComp'
import TableKaryawan from 'src/components/Table/TableKaryawan'

const BarangPage = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <>
      <NavbarComp />
      <div className="container">
        <TableKaryawan
          showAdd={showAdd}
          showEdit={showEdit}
          setShowAdd={setShowAdd}
          setShowEdit={setShowEdit}
        />
      </div>
    </>
  )
}

export default BarangPage
