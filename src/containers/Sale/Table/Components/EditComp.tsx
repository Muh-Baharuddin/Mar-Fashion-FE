import { useState } from "react";
import { Sale } from "services/sale/types";
import EditModalSale from "../../Modal/EditModalSale";

type Props = {
  sale: Sale;
};

const EditComp = ({ sale }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalSale
        showEdit={showEdit}
        sale={sale}
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
