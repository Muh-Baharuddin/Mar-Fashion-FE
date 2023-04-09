import React, { useEffect } from 'react'
import { TableFormControl, useError, useFormRow, useInputRef } from './TableFormControl'
import { useFormContext } from '../DynamicFormProvider';
import { Field } from '../FormControl';

interface TableFormProps<T>{
  control: TableFormControl<T>;
  onSubmit: (data: T[]) => void;
}
export const TableForm = <T extends unknown>(props: TableFormProps<T>) => {
  const { control, onSubmit } = props;
  control.submitFunction = onSubmit;

  try {
    const { setControl } = useFormContext<T>();
    setControl(control);
  } catch(err) {}
  
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      e.stopPropagation();
      control.submit();
    }}>
      <button type='button' value={"Add"} onClick={(e)=> {
        control.addRow();
      }}>Add</button>

      <table style={{borderCollapse: 'collapse', border: '1px solid #ccc', width: '100%'}}>
        <thead>
          <TableHeader control={control}/>
        </thead>
        <tbody>
          <FormBody control={control}/>
        </tbody>
      </table>
    </form>
  )
}

const TableHeader = <T extends unknown>(props: {
  control: TableFormControl<T>,
}) => {
  const { control } = props;
  return (
    <tr>
      {Object.keys(control.fields).map(key => {
        const field = control.getField(key as keyof T);
        return (
          <td key={key} style={{border: '1px solid #ccc', textAlign: 'center'}}>{field.label}</td>
        )
      })}
      <td style={{border: '1px solid #ccc', textAlign: 'center'}}> Action </td>
    </tr>
  )
}

const FormBody = <T extends unknown>(props: {
  control: TableFormControl<T>,
}) => {
  const { control } = props;
  const rows = useFormRow(control);
  return (
    <>
      {
        rows.map((row, index) => {
          return (
            <tr key={row}>
              {Object.keys(control.fields).map(key => {
                const field = control.getField(key as keyof T);
                return (
                  <td key={`${row}_${key}`} style={{border: '1px solid #ccc'}}>
                    <ComponentSection field={field} control={control} name={key as keyof T} index={index}/>
                  </td>
                )
              })}
              <td style={{border: '1px solid #ccc'}}> 
                <button onClick={(e) => {
                  e.preventDefault()
                  if(rows.length === 1){
                    console.log('tidak bisa hapus');
                    return;
                  }
                  control.deleteRow(index)
                }}>Hapus</button>
              </td>
            </tr>
          )}
        )
      }
    </>
  )
}

const ComponentSection = <T extends unknown>(props: {
  field: Field<T>,
  control: TableFormControl<T>,
  name: keyof T,
  index: number,
}) => {
  return (
    <div className='mb-2'>
      <InputComponent {...props}/>
      <ErrorComponent {...props} />
    </div>
  )
}

const InputComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: TableFormControl<T>,
  name: keyof T,
  index: number,
}) => {
  const Component = props.field.component;
  useInputRef({
    index: props.index,
    control: props.control,
    name: props.name,
  });
  
  const componentProps = props.field.props(props.control.getComponentProps( props.name, props.index));
  return (
    <Component {...componentProps}/>
  )
}

const ErrorComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: TableFormControl<T>,
  name: keyof T,
  index: number,
}) => {
  const error = useError<T>({
    control: props.control,
    name: props.name,
    index: props.index,
  });

  return (
    <span role="alert" style={{ color: 'red' }}>{error}</span>
  )
}
