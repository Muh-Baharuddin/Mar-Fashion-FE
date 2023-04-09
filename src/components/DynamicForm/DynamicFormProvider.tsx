import React, { createContext, useContext, PropsWithChildren } from 'react'
import { FormControl } from './FormControl';
import { TableFormControl } from './TableForm/TableFormControl';

interface FormContextProps<T> {
  formData: {
    control: FormControl<T>
  },
  setControl: (control: FormControl<T> | TableFormControl<T>) =>void;
}

const FormContext = createContext<FormContextProps<any>>(undefined as any);

export const useFormContext = <T extends unknown>() => {
  return useContext<FormContextProps<T>>(FormContext);
} 

export const DynamicFormProvider = <T extends unknown>({ children }: PropsWithChildren) => {
  const formData  = {
    control: undefined as unknown as any,
  }
  return (
    <FormContext.Provider
      value={{
        formData,
        setControl: (ctrl: FormControl<T> | TableFormControl<T>) => {
          formData.control = ctrl;
        }
      }}
    >
      {children}
    </FormContext.Provider>
  )
} 
