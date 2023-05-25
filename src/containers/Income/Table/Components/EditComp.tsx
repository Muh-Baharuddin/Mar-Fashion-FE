import { useState } from "react";
import EditModalIncome from "../../Modal/EditModalIncome";
import { Income } from "services/income/types";


type Props = {
  income: Income;
};

const EditComp = ({ income }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalIncome
        showEdit={showEdit}
        income={income}
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
