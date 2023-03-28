import React, { useContext, createContext, Dispatch, SetStateAction } from 'react'
import {  QueryParamsType } from 'services/types';
import { ApiTableControl } from './ApiTableControl'
import { TableBody } from './TableComp/TableBody';
import { TableHead } from './TableComp/TableHead';
import { TablePagination } from './TableComp/TablePagination';


interface ApiTableProps<T> {
  control: ApiTableControl<T>;
  params: QueryParamsType;
  setParams: Dispatch<SetStateAction<QueryParamsType>>
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

export const ApiTable = <T extends unknown>({control, params, setParams}: ApiTableProps<T>) => {

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
