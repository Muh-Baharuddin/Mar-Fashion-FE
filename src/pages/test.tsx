import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Title',
    selector: (row: any) => row.title,
  },
  {
    name: 'Year',
    selector: (row: any) => row.year,
  },
]

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]

const MyComponent = () => {
  return <DataTable columns={columns} data={data} selectableRows />
}

export default MyComponent
