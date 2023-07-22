import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { Category } from 'services/category/types';
import { category_url } from 'services/category';

const tableProps: ApiTableControlProps<Category> = {
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
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp category={data} />
          <DeleteComp category={data} />
        </div>
      )
    },
  ],
  url: category_url,
  orderBy: "name",
  orderType: "ASC"
};

const TableCategory = () => {
  const control = new ApiTableControl<Category>(tableProps);
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

export default TableCategory
