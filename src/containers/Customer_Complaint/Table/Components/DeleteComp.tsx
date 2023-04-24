import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { useApiTableContext } from '../../../../components/ApiTable';
import { Customer_Complaint } from 'services/customer_complaint/types';
import { deleteComplaint } from 'services/customer_complaint';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  complaint: Customer_Complaint;
};

const DeleteComp = ({ complaint }: Props) => {
  const { control } = useApiTableContext<Customer_Complaint>();

  const DeleteConfirm = () => {
    deleteComplaint(complaint.id).then((response) => {
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
      message: 'Apakah Anda yakin ingin menghapus data keluhan dari ' + `${complaint.name} ?`,
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