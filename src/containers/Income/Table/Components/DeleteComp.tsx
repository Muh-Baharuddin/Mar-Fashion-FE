import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useApiTableContext } from '../../../../components/ApiTable';
import { Income } from 'services/income/types';
import { deleteIncome } from 'services/income';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  income: Income;
};

const DeleteComp = ({ income }: Props) => {
  const { control } = useApiTableContext<Income>();

  const DeleteConfirm = () => {
    deleteIncome(income.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data pendapatan pada tanggal ' + `${income.date} ?`,
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