import { useState } from "react";
import EditModalSupplier from "../../Modal/EditModalSupplier";
import { Supplier, useSupplierContext } from "../../Supplier";

type Props = {
  supplier: Supplier;
};

const EditComp = ({ supplier }: Props) => {
  const [editId, setEditId] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setEditId(supplier.id)
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
        onClick={() => handleShowEdit()}
        className="btn btn-primary ms-3"
      >
        <i className="bi bi-pencil-square"></i>
      </button>
    </div>
  )
}

export default EditComp;
