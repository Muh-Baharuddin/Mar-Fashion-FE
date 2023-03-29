import React from 'react'
import { useApiTableContext } from '../ApiTable';

export const TableHead = () => {
  const { control, params, handleSort } = useApiTableContext();
  const handleSortBy = (column: string) => {
    let newOrderType = 'ASC';
    if (column === params.orderBy && params.orderType === 'ASC') {
      newOrderType = 'DESC';
    }
    handleSort(column, newOrderType);
  };
  
  return (
    <thead>
      <tr>
        {
          <th>No.</th> 
        }
        {
          control.getColumns().map(column => (
            <th 
              key={column.label}
              onClick={() => column.sort && handleSortBy(column.sort)}
            >
              {column.label}
              { params.orderBy === column.sort && (
                <i
                  className={`bi bi-caret-${
                    params.orderType === 'ASC' ? 'down' : 'up'
                  }-fill`}
                ></i>
              )}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}
