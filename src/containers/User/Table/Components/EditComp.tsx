import { useState } from "react";
import EditModalUser from "../../Modal/EditModalUser";
import { User } from "services/user/types";


type Props = {
  user: User;
};

const EditComp = ({ user }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalUser
        showEdit={showEdit}
        user={user}
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
