import React, { useState } from 'react';
import { AnyObject, AnyObjectSchema, AnySchema, Maybe, ObjectSchema, ValidationError } from 'yup';

type ValidationType<T> = AnyObjectSchema;

interface UseFormProps<T extends AnyObject>{
  fields: FormFields<T>;
  validations?: ObjectSchema<T>;
  defaultValue?: T,
}

export type FormFields<T> = Record<keyof T, Field<T>>;

export interface Field<T> {
  component: (props: any) => JSX.Element,
  label: string,
  props: (form: ComponentProps<T>) => Record<string, any>;
}

interface FormObject<T> {
  onChange: (name: keyof T, value: any) => void;
  errors: FormErrors<T>;
  control: FormControl<T>;
}

export interface ComponentProps<T> {
  error?: string;
  onChange: (value: T[keyof T]) => void;
}

interface FieldError{
  message: string;
}

type FormErrors<T> = Record<keyof T, string>;

export class FormControl<T> {
  fields: FormFields<T> = {} as FormFields<T>;
  validations?: ValidationType<T>;
  defaultValue?: T;
  componentProps: ComponentProps<T> = {} as ComponentProps<T>;
  data: T = {} as T;
  errors?: FormErrors<T>;
  setError?: React.Dispatch<React.SetStateAction<FormErrors<T>>>;

  constructor(){
    
  }

  onSubmit(onSubmit: (data: T)=> void) {
    try{
      this.validations?.validateSync(this.data, {
        abortEarly: false,
      });
    } catch(e) {
      const error = this.generateError(e as ValidationError);
      this.setFormError(error);
      return;
    }
    onSubmit(this.data);
  }

  setFormError(errors: FormErrors<T>) {
    this.setError && this.setError(errors);
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

  setValue(name: keyof T,value: T[keyof T]): void {
    this.data[name] = value;
  }

  getComponentProps(name: keyof T):  ComponentProps<T> {
    const self = this;
    return {
      error: undefined,
      onChange(value: T[keyof T]){
        self.setValue(name, value);
      }
    }
  }

}



export const useForm = <T extends AnyObject>(props: UseFormProps<T>): FormObject<T> => {
  const control = new FormControl<T>();
  const [ errors, setError ] = useState<FormErrors<T>>({} as FormErrors<T>);

  control.errors = errors;
  control.setError = setError;

  control.fields = props.fields;
  control.defaultValue = props.defaultValue;
  control.validations = props.validations as unknown as AnyObjectSchema;

  return {
    control,
    errors: {} as any,
    onChange(name, value) {
      return '';
    },
  }
};