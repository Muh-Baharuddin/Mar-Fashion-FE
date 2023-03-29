import React from 'react'
import { Supplier } from 'services/supplier/types';
import { useTableContext } from 'src/components/ApiTable';

export const Sort = () => {
  const { tableData} = useTableContext<Supplier>();

  return (
    <select 
      onChange={(e)=>{
        tableData.control.applySortType(e.target.value as "DESC" | "ASC");
      }}
    >
      <option value={"ASC"}>ASC</option>
      <option value={"DESC"}>DESC</option>
    </select>
  )
}
