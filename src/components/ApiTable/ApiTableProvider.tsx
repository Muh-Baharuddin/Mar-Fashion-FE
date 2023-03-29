import React, { useContext, createContext, useState, PropsWithChildren } from 'react'
import { ApiTableControl } from './ApiTableControl';

interface TableContextProps<T> {
  tableData: {
    control: ApiTableControl<T>
  },
  setControl: (control: ApiTableControl<T>) =>void;
}

const TableContext = createContext<TableContextProps<any>>(undefined as any);

export const useTableContext = <T extends unknown>() => {
  return useContext<TableContextProps<T>>(TableContext);
} 

export const ApiTableProvider = <T extends unknown>({ children }: PropsWithChildren) =>{
  const tableData  = {
    control: undefined as unknown as ApiTableControl<T>,
  }

  return (
    <TableContext.Provider
      value={{
        tableData,
        setControl: (ctrl: ApiTableControl<T> )=> {
          tableData.control = ctrl;
        },
      }}
    >
      {children}
    </TableContext.Provider>
  );
}