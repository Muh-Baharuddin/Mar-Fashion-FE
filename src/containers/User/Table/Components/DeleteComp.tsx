import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useApiTableContext } from '../../../../components/ApiTable';
import { User } from 'services/user/types';
import { deleteUser } from 'services/user';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  user: User;
};

const DeleteComp = ({ user }: Props) => {
  const { control } = useApiTableContext<User>();

  const DeleteConfirm = () => {
    deleteUser(user.id).then((response) => {
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
      message: 'Apakah anda yakin ingin menghapus user dengan username ' + `${user.userName} ?`,
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