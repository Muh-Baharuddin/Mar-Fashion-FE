import { useState } from 'react'
import AddModalComplaint from '../../Modal/AddModalComplaint'

const AddComplaintComp = () => {
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => setShowAdd(true)
  const handleCloseAdd = () => setShowAdd(false)

  return (
    <div>
      <AddModalComplaint showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
      <button onClick={handleShowAdd} className="btn btn-primary">
        <i className="bi bi-plus-square"></i>
      </button>
    </div>
  )
}

export default AddComplaintComp