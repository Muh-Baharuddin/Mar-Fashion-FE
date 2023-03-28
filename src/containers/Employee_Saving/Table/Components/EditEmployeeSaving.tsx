import { useState } from "react";
import { EmployeeSaving } from "services/employee/types";
import EditModalEmployee from "../../Modal/EditModalEmployee";

type Props = {
  employeeSaving: EmployeeSaving;
};

const EditEmployeeSaving = ({ employeeSaving }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalEmployee
        showEdit={showEdit}
        employeeSaving={employeeSaving}
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

export default EditEmployeeSaving;
