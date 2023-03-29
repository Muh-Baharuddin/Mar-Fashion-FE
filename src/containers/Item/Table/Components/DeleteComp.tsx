import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { useItemContext } from '../../Item';
import { Item } from 'services/item/types';
import { deleteItem, getItems } from 'services/item';
import { useApiTableContext } from 'src/components/ApiTable';

type Props = {
  item: Item;
};

const DeleteComp = ({ item }: Props) => {
  const { control } = useApiTableContext<Item>();


  const DeleteConfirm = () => {
    deleteItem(item.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data dari ' + `${item.brand} ?`,
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