import { createContext, useContext, useState } from 'react'
import { Item } from 'services/item/types';
import { control } from './Table/TableItem';
import { ApiTableControl } from '../../components/ApiTable';
import AddComp from './Table/Components/AddComp';
import TableItem from './Table/TableItem';

interface ItemContext {
  control: ApiTableControl<Item>
}

const itemContext = createContext<ItemContext>(undefined as unknown as ItemContext)

export const useItemContext = () => {
  return useContext(itemContext)
} 

export const DataItem = () => {

  return (
    <itemContext.Provider value={{
      control, 
    }}>
      <div className="container">
        <h3>Data Barang</h3>
        <div className="card">
          <div className="card-header">
            <AddComp />
          </div>
          <TableItem />
        </div>
      </div>
    </itemContext.Provider>
  )
}
