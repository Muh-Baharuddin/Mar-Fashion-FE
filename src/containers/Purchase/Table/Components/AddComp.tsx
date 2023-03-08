import { useState } from 'react'
import AddModalPurchase from '../../Modal/AddModalPurchase'

const AddComp = () => {
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => setShowAdd(true)
  const handleCloseAdd = () => setShowAdd(false)

  return (
    <div>
      <AddModalPurchase showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
      <button onClick={handleShowAdd} className="btn btn-primary">
        <i className="bi bi-plus-square"></i>
      </button>
    </div>
  )
}

export default AddComp