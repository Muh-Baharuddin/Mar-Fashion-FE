import React, { useRef, useState } from 'react';
import { AnyObject, AnyObjectSchema, ObjectSchema, ValidationError } from 'yup';

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
  depends?: [Array<keyof T>, (data: T) => T[keyof T]];
}

interface FormObject<T> {
  onChange: (name: keyof T, value: any) => void;
  errors: FormErrors<T>;
  control: FormControl<T>;
}

export interface ComponentProps<T> {
  error?: string;
  handleChange: (value: T[keyof T]) => void;
  ref: React.MutableRefObject<undefined>;
  defaultValue: T[keyof T];
  name: keyof T;
}

interface FieldError{
  message: string;
}

type FormErrors<T> = Record<keyof T, string>;

export class FormControl<T> {
  fields: FormFields<T> = {} as FormFields<T>;
  validations?: ValidationType<T>;
  defaultValue: T = {} as T;
  componentProps: ComponentProps<T> = {} as ComponentProps<T>;
  data: T = {} as T;
  setErrorObj: Record<keyof T, React.Dispatch<React.SetStateAction<string | undefined>>> = {} as Record<keyof T, React.Dispatch<React.SetStateAction<string | undefined>>>;
  effects: Record<keyof T, Array<keyof T>> =  {} as Record<keyof T, Array<keyof T>>;
  refs: Record<keyof T, React.MutableRefObject<any>> = {} as Record<keyof T, React.MutableRefObject<any>>;
  submitFunction: (data: T) => void = (data) => {};
  isError?: boolean = true; 

  constructor(){

  }

  setFields(fields: FormFields<T>) {
    this.fields = fields;
    this.setDependand(fields);
  }

  setDefaultValue(defaultValue: T) {
    this.defaultValue = defaultValue;
    if(!this.defaultValue){
      return;
    }

    this.data = {
      ...this.defaultValue,
    };
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
      const errors = this.validate(this.validations, this.data);
      if(errors) {
        this.setFormError(errors);
        return;
      }
    }
    this.isError = false
    this.submitFunction(this.data);
  }
  
  validate(validations: AnyObject, data: any) {
    try{
      this.validations?.validateSync(this.data, {
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
      this.setErrorField(name as keyof T, error);
    })
  }

  setErrorField(name: keyof T, error: string | undefined) {
    this.setErrorObj[name] && this.setErrorObj[name](error);
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
    this.checkEffect(name);
  }

  getValue(name: keyof T): T[keyof T] {
    return this.data[name];
  }

  getDefaultValue(name: keyof T): T[keyof T] {
    if( !this.defaultValue ) {
      return undefined as T[keyof T];
    }
    
    if(this.defaultValue[name]) {
      return this.defaultValue[name];
    }

    const value = this.getDependantValue(name);
    this.defaultValue[name] = value as NonNullable<T>[keyof T];
    return value;
  }

  getDependantValue(name: keyof T): T[keyof T]{
    const depends = this.getDepends(name);
    if(!depends){
      return undefined as T[keyof T];
    }

    const dependsValue = this.getDependData(depends[0], this.defaultValue);
    if(Object.values(dependsValue as object).every(val => !val)){
      return undefined as T[keyof T];
    }

    return depends[1](dependsValue);
  };

  getComponentProps(name: keyof T):  ComponentProps<T> {
    const self = this;
    return {
      name,
      error: undefined,
      defaultValue: self.getDefaultValue(name),
      ref: self.refs[name],
      handleChange(value: T[keyof T]){
        self.setValue(name, value);
        self.validateIput(name, value);
      }
    }
  }

  checkEffect(name: keyof T){
    if (!this.effects[name]) {
      return;
    } 

    this.effects[name].map(effect => {
      const depend = this.getDepends(effect as keyof T);
      if(!depend) {
        return;
      }

      const dependNames = depend[0];
      const dependFunction = depend[1];

      const val = dependFunction(this.getDependData(dependNames));
      this.setValue(effect, val);

      if(this.refs[effect].current) {
        this.refs[effect].current.value = val;
      }
    });
  }

  getDepends(name: keyof T) {
    const field = this.fields[name];
    return field.depends;
  }

  getDependData(depends: Array<keyof T>, defaultData: T = this.data): T {
    return depends.reduce((data, depend) => {
      data[depend] = defaultData[depend];
      return data;
    }, {} as T); 
  }

  validateIput(name: keyof T, value: T[keyof T]) {
    const validation = this.validations?.pick([name]);
    const errors = this.validate(validation as unknown as AnyObjectSchema, {
      [name]: value
    });

    this.setErrorField(name, errors && errors[name]);
  }
}

export const useForm = <T extends AnyObject>(props: UseFormProps<T>): FormObject<T> => {
  const control = new FormControl<T>();
  control.setFields(props.fields);
  control.setDefaultValue(props.defaultValue ? props.defaultValue : {} as T);
  control.validations = props.validations as unknown as AnyObjectSchema;

  return {
    control,
    errors: {} as any,
    onChange(name, value) {
      return '';
    },
  }
};

export const useError = <T extends unknown>(props: {
  control: FormControl<T>,
  name: keyof T,
}): string | undefined => {
  const [error, setError] = useState<string | undefined>();
  props.control.setErrorObj[props.name] = setError;
  return error;
};

export const useInputRef = <T extends unknown>(props: {
  control: FormControl<T>,
  name: keyof T,
}) => {
  const ref = useRef();
  props.control.refs[props.name] = ref;
  return ref;
};


