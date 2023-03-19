import { useState } from "react";
import { Employee } from "services/employee/types";
import EditModalEmployee from "../../Modal/EditModalEmployee";


type Props = {
  employee: Employee;
};

const EditComp = ({ employee }: Props) => {
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
        employee={employee}
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
