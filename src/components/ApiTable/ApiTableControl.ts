import React, { ReactNode } from 'react'

interface Column<T> {
  label: string;
  value: keyof T | ((row: T) => ReactNode);
  sort?: keyof T | string;
}

interface ApiTableControlProps<T> {
  columns: Column<T>[];
  url: string,
  numbering?: boolean;
  orderType?: "ASC" | "DESC",
  orderBy?: keyof T,
}

export class ApiTableControl<T> {
  private columns: Column<T>[] = [];
  private keyName: string = "id";
  url: string = "";
  numbering?: boolean = true;
  orderType: "ASC" | "DESC" = "DESC";
  orderBy: keyof T = "id" as keyof T; 
  filterFunction: (name: string, value: any)=> void = (name, value) => {};
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
    this.filterFunction(name, value);
  }

  refresh() {
    this.refreshFunction();
  }
}