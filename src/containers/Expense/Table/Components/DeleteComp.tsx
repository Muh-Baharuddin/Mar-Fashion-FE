import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useApiTableContext } from '../../../../components/ApiTable';
import { Expense } from 'services/expense/types';
import { deleteExpense } from 'services/expense';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  expense: Expense;
};

const DeleteComp = ({ expense }: Props) => {
  const { control } = useApiTableContext<Expense>();

  const DeleteConfirm = () => {
    deleteExpense(expense.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data pengeluaran pada tanggal ' + `${expense.date} ?`,
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