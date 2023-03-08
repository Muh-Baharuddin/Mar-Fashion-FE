import { useState } from "react";
import EditModalSupplier from "../../Modal/EditModalSupplier";
import { Supplier } from "services/supplier/types";

type Props = {
  supplier: Supplier;
};

const EditComp = ({ supplier }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalSupplier
        showEdit={showEdit}
        supplier={supplier}
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
