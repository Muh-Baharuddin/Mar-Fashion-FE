import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { Customer_Complaint } from 'services/customer_complaint/types';
import { complaint_url } from 'services/customer_complaint';

const tableProps: ApiTableControlProps<Customer_Complaint> = {
  columns: [
    {
      label: "Nama",
      value: (data) => (
        <>
          {data?.name || "-"}
        </>
      ),
      sort: "name",
    },
    {
      label: "Alamat",
      value: (data) => (
        <>
          {data?.address || "-"}
        </>
      ),
      sort: "address",
    },
    {
      label: "Kota",
      value: (data) => (
        <>
          {data?.city || "-"}
        </>
      ),
      sort: "city",
    },
    {
      label: "Keluhan",
      value: "description",
      sort: "description",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp complaint={data} />
          <DeleteComp complaint={data} />
        </div>
      )
    },
  ],
  url: complaint_url,
  orderBy: "name",
  orderType: "ASC"
};

const TableCustome_Complaint = () => {
  const control = new ApiTableControl<Customer_Complaint>(tableProps);
  return (
    <>
      <div className="card-body">
        <KeywordsFilter control={control}/>
        <ApiTable
          control={control}
        />
      </div>
    </>
  )
}

export default TableCustome_Complaint
