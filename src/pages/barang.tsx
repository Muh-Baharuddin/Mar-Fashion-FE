import { useState } from 'react'
import NavbarComp from 'src/components/Navbar/NavbarComp'
import TableBarang from 'src/components/Table/TableBarang'

const BarangPage = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <>
      <NavbarComp />
      <div className="container">
        <TableBarang
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
