import axios from "axios"
import 'bootstrap-icons/font/bootstrap-icons.css'

type Props = {
  id: string;
};

const DeleteComp = ({ id }: Props) => {
  const handleDelete = () => {
    axios
      .delete(`${process.env.API_ENDPOINT}supplier/` + id)
      .then((response) => {
        alert(response.data.message)
        window.location.reload()
      })
  }
  return (
    <div>
      <button
        onClick={() => handleDelete()}
        className="btn btn-danger ms-3"
      >
      <i className="bi bi-trash3-fill"></i>
      </button>
    </div>
  )
}

export default DeleteComp