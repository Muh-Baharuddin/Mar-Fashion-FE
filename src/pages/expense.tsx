import { AdminLayout } from '@layouts/AdminLayout'
import { DataExpense } from '../containers/Expense'

const ExpensePage = () => {
  return (
    <AdminLayout>
      <DataExpense />
    </AdminLayout>
  )
}

export default ExpensePage
