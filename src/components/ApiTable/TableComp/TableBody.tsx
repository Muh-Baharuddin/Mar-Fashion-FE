import React from 'react'
import { useApiTableContext } from '../ApiTable';
import { getData } from '../service';
import { TableLoading } from './TableLoading';
import { TableRow } from './TableRow';

export const TableBody = <T extends unknown>() => {
  const { params, control } = useApiTableContext<T>();
  const { data, isLoading, mutate } =  getData<T>(control.url, params);
  control.refreshFunction = mutate;
  
  return (
    <tbody>
      { isLoading ? (
        <tr>
          <td colSpan={control.getTotalColumn()} style={{ textAlign:'center' }}>
            <TableLoading/>
          </td>
        </tr>
      ) : data && (
        data.data.map((row, index) => (
          <TableRow key={control.getKey(row)} data={row} index={index} />
        ))
      )}
    </tbody>
  )
}
