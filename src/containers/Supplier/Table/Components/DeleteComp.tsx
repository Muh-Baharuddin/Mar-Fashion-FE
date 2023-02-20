import axios from "axios"
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { Supplier, useSupplierContext } from "../../Supplier";

type Props = {
  supplier: Supplier;
};

const DeleteComp = ({ supplier }: Props) => {
  const { refreshSupplier } = useSupplierContext();

  const DeleteConfirm = () => {
    axios
    .delete(`${process.env.API_ENDPOINT}supplier/` + supplier.id)
    .then((response) => {
      toast.success(response.data.message);
      refreshSupplier();
    })
    .catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    });
  }

  const handleDelete = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus data dari ' + `${supplier.nama} ?`,
      buttons: [
        {
          label: 'Ya',
          onClick: DeleteConfirm,
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
      <ToastContainer />
    </div>
  )
}

export default DeleteComp