import React, { useEffect } from 'react'
import { Field, FormControl, useError, useInputRef } from './FormControl'
import { Button } from 'react-bootstrap';

interface DynamicFormProps<T>{
  control: FormControl<T>;
  onSubmit: (data: T) => void;
}
export const DynamicForm = <T extends unknown>(props: DynamicFormProps<T>) => {
  const { control, onSubmit } = props;
  control.submitFunction = onSubmit;
  
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      control.submit();
    }}>
      {Object.keys(control.fields).map(key => {
        const field = control.getField(key as keyof T);
        return (
          <ComponentSection field={field} key={key} control={control} name={key as keyof T}/>
        )
      })}
      <div>
        <Button variant="primary" onClick={() => {}} type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

const ComponentSection = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  return (
    <>
      <div>{props.field.label}</div>
      <InputComponent {...props}/>
      <ErrorComponent {...props} />
    </>
  )
}

const InputComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  const Component = props.field.component;
  useInputRef({
    control: props.control,
    name: props.name,
  });
  
  const componentProps = props.field.props(props.control.getComponentProps(props.name));
  return (
    <Component {...componentProps}/>
  )
}

const ErrorComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  const error = useError<T>({
    control: props.control,
    name: props.name,
  });

  return (
    <span role="alert" style={{ color: 'red' }}>{error}</span>
  )
}
