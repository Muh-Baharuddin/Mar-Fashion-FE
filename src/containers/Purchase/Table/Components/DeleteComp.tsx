import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { usePurchaseContext } from '../../Purchase';
import { deletePurchase, getPurchases } from 'services/purchase';
import { Purchase } from 'services/purchase/types';

type Props = {
  purchase: Purchase;
};

const DeleteComp = ({ purchase }: Props) => {
  const { queryParams } = usePurchaseContext();
  const { mutate } = getPurchases(queryParams);


  const DeleteConfirm = () => {
    deletePurchase(purchase.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data dari ' + `${purchase.date} ?`,
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