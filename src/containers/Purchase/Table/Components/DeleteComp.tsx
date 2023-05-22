import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { deletePurchase } from 'services/purchase';
import { Purchase } from 'services/purchase/types';
import { useApiTableContext } from 'src/components/ApiTable';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  purchase: Purchase;
};

const DeleteComp = ({ purchase }: Props) => {
  const { control } = useApiTableContext<Purchase>();

  const DeleteConfirm = () => {
    deletePurchase(purchase.id).then((response) => {
      toast.success(response.data.message);
      control.refresh();
    })
    .catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    });
  }

  const handleDelete = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus data pembelian dari invoice bernomor "' + `${purchase.invoice}" ?`,
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