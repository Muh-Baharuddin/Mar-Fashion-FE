import { useState } from 'react'
import AddModalStore from '../../Modal/AddModalStore'

const AddComplaintComp = () => {
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => setShowAdd(true)
  const handleCloseAdd = () => setShowAdd(false)

  return (
    <div>
      <AddModalStore showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
      <button onClick={handleShowAdd} className="btn btn-primary">
        <i className="bi bi-plus-square"></i>
      </button>
    </div>
  )
}

export default AddComplaintComp