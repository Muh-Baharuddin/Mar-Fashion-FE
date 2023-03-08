import { useState } from "react";
import { Item } from "services/item/types";
import EditModalItem from "../../Modal/EditModalItem";

type Props = {
  item: Item;
};

const EditComp = ({ item }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalItem
        showEdit={showEdit}
        item={item}
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
