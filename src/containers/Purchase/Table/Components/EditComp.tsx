import { useState } from "react";
import EditModalPurchase from "../../Modal/EditModalPurchase";
import { Purchase } from "services/purchase/types";

type Props = {
  purchase: Purchase;
};

const EditComp = ({ purchase }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalPurchase
        showEdit={showEdit}
        purchase={purchase}
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
