import 'bootstrap-icons/font/bootstrap-icons.css'
import EditComp from './Components/EditComp';
import DeleteComp from './Components/DeleteComp';
import { ApiTable, ApiTableControl, ApiTableControlProps, KeywordsFilter } from '../../../components/ApiTable'
import { User } from 'services/user/types';
import { user_url } from 'services/user';

const tableProps: ApiTableControlProps<User> = {
  columns: [
    {
      label: "Username",
      value: 'userName',
      sort: "userName",
    },
    {
      label: "Password",
      value: 'password',
      sort: "password",
    },
    {
      label: "Role",
      value: 'role',
      sort: "role",
    },
    {
      label: "Actions",
      value: (data) => (
        <div style={{ display: 'flex' }}>
          <EditComp user={data} />
          <DeleteComp user={data} />
        </div>
      )
    },
  ],
  url: user_url,
  orderBy: "userName",
  orderType: "ASC"
};

const TableUser = () => {
  const control = new ApiTableControl<User>(tableProps);
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

export default TableUser
