import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useApiTableContext } from '../../../../components/ApiTable';
import { StoreLocation } from 'services/store_location/types';
import { deleteStoreLocation } from 'services/store_location';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  storeLocation: StoreLocation;
};

const DeleteComp = ({ storeLocation }: Props) => {
  const { control } = useApiTableContext<StoreLocation>();

  const DeleteConfirm = () => {
    deleteStoreLocation(storeLocation.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus informasi dari toko ' + `${storeLocation.name} ?`,
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