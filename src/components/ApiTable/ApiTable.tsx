import React, { useContext, createContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
import { ApiTableControl } from './ApiTableControl'
import { useTableContext } from './ApiTableProvider';
import { TableBody } from './TableComp/TableBody';
import { TableHead } from './TableComp/TableHead';
import { TablePagination } from './TableComp/TablePagination';
import Table from 'react-bootstrap/Table';

interface ApiTableProps<T> {
  control: ApiTableControl<T>;
}

interface ApiTableContextProps<T> {
  control: ApiTableControl<T>;
}

const TableContext = createContext<ApiTableContextProps<any>>(undefined as any);

export const useApiTableContext = <T extends unknown>() => {
  return useContext<ApiTableContextProps<T>>(TableContext);
} 

export const ApiTable = <T extends unknown>({control}: ApiTableProps<T>) => {
  try {
    const { setControl } = useTableContext<T>();
    setControl(control);
  } catch(err) {}

  const defaulParams: QueryParamsType = {
    keywords: '',
    orderBy: control.orderBy as string,
    orderType: control.orderType,
    page: 1,
    limit: 10,
  }

  const [ params, setParams] = useState<QueryParamsType>(defaulParams);
  control.setParams = setParams;
  control.params = params;
  
  return (
    <TableContext.Provider
      value={{
        control,
      }}
    >
      <Table bordered hover responsive>
        <TableHead/>
        <TableBody/>
      </Table>
      <div className="pagination-container">
        <TablePagination/>
      </div>
    </TableContext.Provider>
  )
}
