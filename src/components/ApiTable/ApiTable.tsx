import React, { useContext, createContext, useState } from 'react'
import { QueryParamsType } from 'services/types';
import { ApiTableControl } from './ApiTableControl'
import { useTableContext } from './ApiTableProvider';
import { TableBody } from './TableComp/TableBody';
import { TableHead } from './TableComp/TableHead';
import { TablePagination } from './TableComp/TablePagination';

interface ApiTableProps<T> {
  control: ApiTableControl<T>;
}

interface ApiTableContextProps<T> {
  control: ApiTableControl<T>;
  params: QueryParamsType,
  handleSort: (by: string, type: "ASC" | "DESC")=> void;
  handlePageClick: (page: number) => void;
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

  const handleSort = (by: string, type: "ASC" | "DESC")=> {
    control.orderBy = by as keyof T;
    control.orderType = type;
    setParams((prev) => {
      return {
        ...prev,
        ...{
          orderBy: by,
          orderType: type,
        }
      }
    });
  }

  control.handleSortFunction = handleSort;

  const handlePageClick = (page: number) => {
    setParams((prev) => {
      return { ...prev, page};
    });
  }

  const setFilter = (name: string, value: any) => {
    setParams((prev) => {
      return { 
        ...prev, 
        [name]: value,
      };
    });
  }

  control.filterFunction = setFilter;
  
  return (
    <TableContext.Provider
      value={{
        params,
        handleSort,
        handlePageClick,
        control,
      }}
    >
      <table className="table table-bordered">
        <TableHead/>
        <TableBody/>
      </table>
      <div className="pagination-container">
        <TablePagination/>
      </div>
    </TableContext.Provider>
  )
}
