import { UserRoleCondition } from 'src/components/Condition/UserRoleCondition'
import { DataKaryawan } from '../containers/Karyawan'

const DataKaryawanPage = () => {
  return (
    <UserRoleCondition>
      <DataKaryawan />
    </UserRoleCondition>
  )
}

export default DataKaryawanPage
