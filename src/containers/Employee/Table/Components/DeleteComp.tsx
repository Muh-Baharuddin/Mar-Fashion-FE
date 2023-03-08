import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useEmployeeContext } from '../../Employee';
import { Employee } from 'services/employee/types';
import { deleteSupplier, getSuppliers } from "services/supplier";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  employee: Employee;
};

const DeleteComp = ({ employee }: Props) => {
  const { queryParams } = useEmployeeContext();
  const { mutate } = getSuppliers(queryParams);


  const DeleteConfirm = () => {
    deleteSupplier(employee.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data dari ' + `${employee.name} ?`,
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