import { useState } from "react";
import EditModalComplaint from "../../Modal/EditModalComplaint";
import { Customer_Complaint } from "services/customer_complaint/types";


type Props = {
  complaint: Customer_Complaint;
};

const EditComp = ({ complaint }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalComplaint
        showEdit={showEdit}
        complaint={complaint}
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
