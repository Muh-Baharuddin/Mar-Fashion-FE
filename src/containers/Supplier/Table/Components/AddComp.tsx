import { useState } from 'react'
import AddModalSupplier from '../../Modal/AddModalSupplier'

type Props = {
  refreshSupplier: () => void;
};

const AddComp = ({refreshSupplier}: Props) => {
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => setShowAdd(true)
  const handleCloseAdd = () => setShowAdd(false)

  return (
    <div>
      <AddModalSupplier showAdd={showAdd} handleCloseAdd={handleCloseAdd} refreshSupplier={refreshSupplier}/>
      <button onClick={handleShowAdd} className="btn btn-primary">
        <i className="bi bi-plus-square"></i>
      </button>
    </div>
  )
}

export default AddComp