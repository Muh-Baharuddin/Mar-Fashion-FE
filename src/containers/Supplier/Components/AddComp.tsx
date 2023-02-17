import { useState } from 'react'

const AddComp = () => {
  const [showAdd, setShowAdd] = useState(false)

  const handleShowAdd = () => setShowAdd(true)
  const handleCloseAdd = () => setShowAdd(false)

  return (
    <div>AddComp</div>
  )
}

export default AddComp