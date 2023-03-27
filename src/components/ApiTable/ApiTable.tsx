import React, { useContext, createContext } from 'react'
import { useState } from 'react';
import {  QueryParamsType } from 'services/types';
import { ApiTableControl } from './ApiTableControl'
import { TableBody } from './TableComp/TableBody';
import { TableHead } from './TableComp/TableHead';
import { TablePagination } from './TableComp/TablePagination';


interface ApiTableProps<T> {
  control: ApiTableControl<T>;
}

interface ApiTableContextProps<T> {
  control: ApiTableControl<T>;
  params: QueryParamsType,
  handleSort: (by: string, type: string)=> void;
  handlePageClick: (page: number) => void;
}

const TableContext = createContext<ApiTableContextProps<any>>(undefined as any);

export const useApiTableContext = <T extends unknown>() => {
  return useContext<ApiTableContextProps<T>>(TableContext);
} 

export const ApiTable = <T extends unknown>(props: ApiTableProps<T>) => {
  const [params, setParams] = useState<QueryParamsType>({
    keywords: '',
    orderBy: 'brand',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  })

  const handleSort = (by: string, type: string)=> {
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

  props.control.filterFunction = setFilter;
  
  return (
    <TableContext.Provider
      value={{
        params,
        handleSort,
        handlePageClick,
        control: props.control,
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
