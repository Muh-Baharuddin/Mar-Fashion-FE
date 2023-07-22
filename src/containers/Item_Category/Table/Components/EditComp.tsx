import { useState } from "react";
import EditModalCategory from "../../Modal/EditModalCategory";
import { Category } from "services/category/types";


type Props = {
  category: Category;
};

const EditComp = ({ category }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <EditModalCategory
        showEdit={showEdit}
        category={category}
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
