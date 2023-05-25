import { useState } from "react";
import EditModalExpense from "../../Modal/EditModalExpense";
import { Expense } from "services/expense/types";


type Props = {
  expense: Expense;
};

const EditComp = ({ expense }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalExpense
        showEdit={showEdit}
        expense={expense}
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
