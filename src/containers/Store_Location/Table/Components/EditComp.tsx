import { useState } from "react";
import EditModalStore from "../../Modal/EditModalStore";
import { StoreLocation } from "services/store_location/types";


type Props = {
  storeLocation: StoreLocation;
};

const EditComp = ({ storeLocation }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalStore
        showEdit={showEdit}
        storeLocation={storeLocation}
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
