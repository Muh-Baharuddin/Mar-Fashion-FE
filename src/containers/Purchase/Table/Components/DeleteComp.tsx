import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSupplierContext } from "../../Supplier";
import { deleteSupplier, getSuppliers } from "services/supplier";
import { Supplier } from "services/supplier/types";

type Props = {
  supplier: Supplier;
};

const DeleteComp = ({ supplier }: Props) => {
  const { queryParams } = useSupplierContext();
  const { mutate } = getSuppliers(queryParams);


  const DeleteConfirm = () => {
    deleteSupplier(supplier.id).then((response) => {
      toast.success(response.data.message);
      mutate();
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
    </div>
  )
}

export default DeleteComp