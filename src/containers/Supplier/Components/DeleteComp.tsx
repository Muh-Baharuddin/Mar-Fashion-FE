import axios from "axios"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  id: string;
};

const DeleteComp = ({ id }: Props) => {
  const handleDelete = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus data ini?',
      buttons: [
        {
          label: 'Ya',
          onClick: () => {
            axios
            .delete(`${process.env.API_ENDPOINT}supplier/` + id)
            .then((response) => {
              alert(response.data.message)
              window.location.reload()
            })
            .catch(() => {
              alert("Maaf sepertinya terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
            });
          },
        },
        {
          label: 'Tidak',
        }
      ],
    });
  };
  return (
    <div>
      <button onClick={() => handleDelete()} className="btn btn-danger ms-3">
        <i className="bi bi-trash3-fill"></i>
      </button>
    </div>
  )
}

export default DeleteComp