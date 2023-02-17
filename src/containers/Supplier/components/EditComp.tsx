import { useState } from "react";
import EditModalSupplier from "../Modal/EditModalSupplier";

type Props = {
  id: string;
};

export const EditComp = ({ id }: Props) => {
  const [editId, setEditId] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = (id: string) => {
    setEditId(id)
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setEditId('')
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalSupplier
        showEdit={showEdit}
        editId={editId}
        handleCloseEdit={handleCloseEdit}
      />
      <button
        onClick={() => handleShowEdit(id)}
        className="btn btn-primary ms-3"
      >
        <i className="bi bi-pencil-square"></i>
      </button>
    </div>
  )
}
