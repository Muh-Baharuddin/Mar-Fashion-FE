import React from 'react'
import { useApiTableContext } from '../ApiTable';

export const TableHead = () => {
  const { control } = useApiTableContext();
  const handleSortBy = (column: string) => {
    let newOrderType: 'ASC' | 'DESC' = 'ASC';
    if (column === control.params.orderBy && control.params.orderType === 'ASC') {
      newOrderType = 'DESC';
    }
    control.handleSort(column, newOrderType);
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
              { control.params.orderBy === column.sort && (
                <i
                  className={`bi bi-caret-${
                    control.params.orderType === 'ASC' ? 'down' : 'up'
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
