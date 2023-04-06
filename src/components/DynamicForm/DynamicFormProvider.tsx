import React, { createContext, useContext, PropsWithChildren } from 'react'
import { FormControl } from './FormControl';

interface FormContextProps<T> {
  formData: {
    control: FormControl<T>
  },
  setControl: (control: FormControl<T>) =>void;
}

const FormContext = createContext<FormContextProps<any>>(undefined as any);

export const useFormContext = <T extends unknown>() => {
  return useContext<FormContextProps<T>>(FormContext);
} 

export const DynamicFormProvider = <T extends unknown>({ children }: PropsWithChildren) => {
  const formData  = {
    control: undefined as unknown as FormControl<T>,
  }
  return (
    <FormContext.Provider
      value={{
        formData,
        setControl: (ctrl: FormControl<T>) => {
          formData.control = ctrl;
        }
      }}
    >
      {children}
    </FormContext.Provider>
  )
} 
