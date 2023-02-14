import { UserRoleCondition } from "src/components/Condition/UserRoleCondition"
import { DataPenjualan } from "../containers/Penjualan"

const NotaPenjualanPage = () => {
  return (
    <UserRoleCondition>
      <DataPenjualan />
    </UserRoleCondition>
  )
}

export default NotaPenjualanPage
