import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { StoreLocation } from 'services/store_location/types';
import { storeLocation_url } from 'services/store_location';

const tableProps: ApiTableControlProps<StoreLocation> = {
  columns: [
    {
      label: "Nama",
      value: "name",
      sort: "name",
    },
    {
      label: "Alamat",
      value: "address",
      sort: "address",
    },
    {
      label: "Kota",
      value: "city",
      sort: "city",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp storeLocation={data} />
          <DeleteComp storeLocation={data} />
        </div>
      )
    },
  ],
  url: storeLocation_url,
  orderBy: "name",
  orderType: "ASC"
};

const TableCustome_Complaint = () => {
  const control = new ApiTableControl<StoreLocation>(tableProps);
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
