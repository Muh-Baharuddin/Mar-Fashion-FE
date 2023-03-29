import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { EmployeeSaving } from 'services/employee/types';
import { deleteEmployeeSaving } from 'services/employee';
import { useEmployeeSavingContext } from '../../Employee_Saving';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  employeeSaving: EmployeeSaving;
};

const DeleteEmployeeSaving = ({ employeeSaving }: Props) => {
  const { control } = useEmployeeSavingContext();

  const DeleteConfirm = () => {
    deleteEmployeeSaving(employeeSaving.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data dari ' + `${employeeSaving.__employee__?.name} pada tanggal ${employeeSaving.date} ?`,
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

export default DeleteEmployeeSaving