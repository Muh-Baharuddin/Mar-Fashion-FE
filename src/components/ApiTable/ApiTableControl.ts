import React, { ReactNode } from 'react'
import { QueryParamsType } from 'services/types';

interface Column<T> {
  label: string;
  value: keyof T | ((row: T) => ReactNode);
  sort?: keyof T | string;
}

type OrderType = "ASC" | "DESC";

export interface ApiTableControlProps<T> {
  columns: Column<T>[];
  url: string,
  numbering?: boolean;
  orderType?: OrderType,
  orderBy?: keyof T,
}

export class ApiTableControl<T> {
  private columns: Column<T>[] = [];
  private keyName: string = "id";
  url: string = "";
  numbering?: boolean = true;
  orderType: OrderType = "DESC";
  orderBy: keyof T = "id" as keyof T; 
  params: QueryParamsType;
  setParams: React.Dispatch<React.SetStateAction<QueryParamsType>> = () => {} ;
  refreshFunction: ()=> void = () => {};

  constructor (props: ApiTableControlProps<T>) {
    this.columns = props.columns
    this.url = props.url;
    this.numbering = props.numbering;
    if(props.orderBy) {
      this.orderBy = props.orderBy;
    }
    if(props.orderType) {
      this.orderType = props.orderType;
    }
    this.params = {
      keywords: '',
      orderBy: this.orderBy as string,
      orderType: this.orderType,
      page: 1,
      limit: 10,
    };
  }

  getColumns() {
    return this.columns;
  }

  getTotalColumn() {
    return this.columns.length;
  }

  private getKeyName(){
    return this.keyName;
  }

  getValue(data: T, column: Column<T>): ReactNode {
    if (typeof column.value !== "function") {
      return data[column.value] as unknown as ReactNode;
    }

    return column.value(data)
  }

  getKey(data: T): any {
    const key = this.getKeyName();
    return data[key as keyof T] as unknown as ReactNode;
  }

  getColumnKey(data: T, column: Column<T>): any {
    const key = this.getKey(data);
    return `${key}-${column.label}`;
  }

  filter(name: string, value: any) {
    this.setParams((prev) => {
      return { 
        ...prev, 
        [name]: value,
      };
    });
  }

  handleSort(by: string, type: OrderType) {
    this.orderBy = by as keyof T;
    this.orderType = type;
    this.setParams((prev) => {
      return {
        ...prev,
        ...{
          orderBy: by,
          orderType: type,
        }
      }
    });
  }

  handlePageClick = (page: number) => {
    this.setParams((prev) => {
      return { ...prev, page };
    });
  }

  refresh() {
    this.refreshFunction();
  }
}