import axios from "axios"

type Props = {
  id: string;
};

const DeleteComp = ({ id }: Props) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      axios
        .delete(`${process.env.API_ENDPOINT}supplier/` + id)
        .then((response) => {
          alert(response.data.message)
          window.location.reload()
        })
    }
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