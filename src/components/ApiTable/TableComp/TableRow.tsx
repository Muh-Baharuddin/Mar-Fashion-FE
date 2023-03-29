import React from 'react'
import { useApiTableContext } from '../ApiTable'

interface TableRowProps<T> {
  data: T;
  index: number;
}

export const TableRow = <T extends unknown>(props: TableRowProps<T>) => {
  const { control, params } = useApiTableContext<T>();
  const { data, index } = props;
  control.numbering = true;
  return (
    <tr>
      {
        control.numbering && (
          <td>
            {(params.page-1) * params.limit + index + 1}
          </td>
        ) 
      }
      {
        control.getColumns().map(column => (
          <td key={control.getColumnKey(data, column )}>{control.getValue(data, column)}</td>
        ))
      }
    </tr>
  )
}
