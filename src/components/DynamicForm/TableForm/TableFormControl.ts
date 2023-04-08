import React, { useRef, useState } from 'react';
import { AnyObject, AnyObjectSchema, ObjectSchema, ValidationError, array } from 'yup';
import { ComponentProps, Field, FormErrors, FormFields, UseFormProps, ValidationType } from '../FormControl';

export type SetErrorsObj<T> = Record<keyof T, React.Dispatch<React.SetStateAction<string | undefined>>>;
export type RefsObject<T> = Record<keyof T, React.MutableRefObject<any>>;

export class TableFormControl<T> {
  fields: FormFields<T> = {} as FormFields<T>;
  validations?: ValidationType<T>;
  defaultValue: T[] = [] as T[];
  data: T[] = [] as T[];
  defaultRow: number = 1;
  currentRow?: number[];
  setRow?: React.Dispatch<React.SetStateAction<number[]>>;
  setErrorObj: SetErrorsObj<T>[] = [] as SetErrorsObj<T>[];
  effects: Record<keyof T, Array<keyof T>> =  {} as Record<keyof T, Array<keyof T>>;
  refs: RefsObject<T>[] = [] as RefsObject<T>[];
  submitFunction: (data: T[]) => void = (data) => {};

  constructor(){

  }

  setFields(fields: FormFields<T>) {
    this.fields = fields;
    this.setDependand(fields);
  }

  setDefaultValue(defaultValue: T[]) {
    this.defaultValue = defaultValue;
    if(!this.defaultValue){
      return;
    }

    this.data = [
      ...this.defaultValue,
    ];
  }

  addRow(){
    this.setRow && this.setRow(prev => {
      const lastNumber = prev[prev.length-1] | 0;
      const newArr = [...prev];
      newArr.push(lastNumber+1)
      return newArr;
    });
  }

  deleteRow(index: number){
    this.data.splice(index, 1);
    this.defaultValue.splice(index, 1);
    this.setErrorObj.splice(index, 1);
    this.refs.splice(index, 1);

    this.setRow && this.setRow(prev => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  }

  setDependand(fields: FormFields<T>) {
    Object.keys(fields).map(name => {
      const field = fields[name as keyof T];
      if(!field.depends) {
        return;
      }

      field.depends[0].map(depend => {
        if(!this.effects[depend]) {
          this.effects[depend] = [];
        }

        this.effects[depend].push(name as keyof T);
      });
    });
  }

  submit() {
    if(this.validations) {
      const data = this.data.length ? this.data : [undefined] as T[];
      const validations = array().of(this.validations);
      const errors = this.validate(validations, data);
      if(errors) {
        this.setFormError(errors);
        return;
      }

    }
    this.submitFunction(this.data);
  }
  
  validate(validations: AnyObject, data: T | T[]) {
    try{
      validations.validateSync(data, {
        abortEarly: false,
      });
    } catch(e) {
      const error = this.generateError(e as ValidationError);
      return error;
    }
    return;
  }

  setFormError(errors: FormErrors<T>) {
    Object.keys(errors).map(name => {
      const error = errors[name as keyof T];
      const result =  /\[(\d)\]\.((\w)+)/g.exec(name);
      const index = Number(result && result[1]);
      const tName = result && result[2];

      this.setErrorField(tName as keyof T, error, index);
    })
  }

  setErrorField(name: keyof T, error: string | undefined, index: number) {
    this.setErrorObj[index] && this.setErrorObj[index][name](error);
  }

  generateError(errors: ValidationError): FormErrors<T> {
    return errors.inner.reduce((data, err) =>{
      data[err.path as keyof T] =  err.message;
      return data;
    },{} as FormErrors<T>);
  }

  getField(key: keyof T): Field<T> {
    return this.fields[key];
  }

  setValue(name: keyof T,value: T[keyof T], index: number): void {
    if(!this.data[index]) {
      this.data[index] = {} as T;
    }
    this.data[index][name] = value;
    // this.checkEffect(name);
  }

  setDefaultRow(defaultRow?: number) {
    if(!defaultRow) {
      return;
    }
    this.defaultRow = defaultRow;
  }

  getValue(name: keyof T): T[keyof T] {
    // return this.data[name];
    return true as any;
  }

  getDefaultValue(name: keyof T, index: number): T[keyof T] {
    if( !this.defaultValue.length || !this.defaultValue[index]) {
      return undefined as T[keyof T];
    }
    
    if(this.defaultValue[index][name]) {
      return this.defaultValue[index][name];
    }

    // const value = this.getDependantValue(name);
    // this.defaultValue[name] = value as NonNullable<T>[keyof T];
    // return value;
    return true as any;
  }

  getDependantValue(name: keyof T): T[keyof T]{
    // const depends = this.getDepends(name);
    // if(!depends){
    //   return undefined as T[keyof T];
    // }

    // const dependsValue = this.getDependData(depends[0], this.defaultValue);
    // if(Object.values(dependsValue as object).every(val => !val)){
    //   return undefined as T[keyof T];
    // }

    // return depends[1](dependsValue);
    return true as any;
  };

  getComponentProps(name: keyof T, index: number):  ComponentProps<T> {
    const self = this;
    return {
      name,
      error: undefined,
      defaultValue: self.getDefaultValue(name, index),
      innerRef: self.refs[index] && self.refs[index][name],
      handleChange(value: T[keyof T]){
        self.setValue(name, value, index);
        self.validateIput(name, value, index);
      }
    }
  }

  checkEffect(name: keyof T){
    // if (!this.effects[name]) {
    //   return;
    // } 

    // this.effects[name].map(effect => {
    //   const depend = this.getDepends(effect as keyof T);
    //   if(!depend) {
    //     return;
    //   }

    //   const dependNames = depend[0];
    //   const dependFunction = depend[1];

    //   const val = dependFunction(this.getDependData(dependNames));
    //   this.setValue(effect, val);

    //   if(this.refs[effect].current) {
    //     this.refs[effect].current.value = val;
    //   }
    // });
  }

  getDepends(name: keyof T) {
    const field = this.fields[name];
    return field.depends;
  }

  getDependData(depends: Array<keyof T>, defaultData: T[] = this.data): T {
    // return depends.reduce((data, depend) => {
    //   data[depend] = defaultData[depend];
    //   return data;
    // }, {} as T); 
    return true as any;
  }

  validateIput(name: keyof T, value: T[keyof T], index: number) {
    const validation = this.validations?.pick([name]);
    const errors = this.validate(validation as unknown as AnyObjectSchema, {
      [name]: value
    } as T);

    this.setErrorField(name, errors && errors[name], index);
  }
}

export interface UseTableFormProps<T extends AnyObject> extends Omit<UseFormProps<T>, 'defaultValue'>{
  defaultValue?: T[];
  defaultRow?: number;
}

export interface TableFormObject<T> {
  control: TableFormControl<T>;
}

export const useTableForm = <T extends AnyObject>(props: UseTableFormProps<T>): TableFormObject<T> => {
  const control = new TableFormControl<T>();
  control.setFields(props.fields);
  control.setDefaultValue(props.defaultValue ? props.defaultValue : [] as T[]);
  control.validations = props.validations as unknown as AnyObjectSchema;

  return {
    control,
  }
};

export const useError = <T extends unknown>(props: {
  control: TableFormControl<T>,
  name: keyof T,
  index: number,
}): string | undefined => {
  const [error, setError] = useState<string | undefined>();
  if(! props.control.setErrorObj[props.index]) {
    props.control.setErrorObj[props.index] = {} as SetErrorsObj<T>;
  }

  props.control.setErrorObj[props.index][props.name] = setError;
  return error;
};

export const useInputRef = <T extends unknown>(props: {
  control: TableFormControl<T>,
  name: keyof T,
  index: number,
}) => {
  const ref = useRef();
  if(!props.control.refs[props.index]) {
    props.control.refs[props.index] = {} as RefsObject<T>;
  }

  props.control.refs[props.index][props.name] = ref;
  return ref;
};

export const useFormRow = <T extends unknown>(control: TableFormControl<T>) => {
  // control.defaultRow

  if(!control.currentRow) {
    const row: number[] = [];
    for(let i=0; i<control.defaultRow; i++) {
      row.push(i+1);
    }

    control.currentRow = row;
  }

  const [row, setRow] = useState<number[]>(control.currentRow); 
  control.setRow = setRow;
  control.currentRow = row;
  return row;
};

