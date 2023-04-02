import React from 'react'
import { Field, FormControl } from './FormControl'
import { Button } from 'react-bootstrap';

interface DynamicFormProps<T>{
  control: FormControl<T>;
  onSubmit: (data: T) => void;
}
export const DynamicForm = <T extends unknown>(props: DynamicFormProps<T>) => {
  const { control, onSubmit } = props;
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      control.onSubmit(onSubmit);
    }}>
      {Object.keys(control.fields).map(key => {
        const field = control.getField(key as keyof T);
        return (
          <InputComponent field={field} key={key} control={control} name={key as keyof T}/>
        )
      })}

      <Button variant="primary" onClick={() => {}} type="submit">
        Submit
      </Button>
    </form>
  )
}

const InputComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  const Component = props.field.component;
  const componentProps = props.field.props(props.control.getComponentProps(props.name));
  return (
    <>
      <div>{props.field.label}</div>
      <Component {...componentProps}/>
      {props.control.errors && props.control.errors[props.name] && 
        <span role="alert" style={{ color: 'red' }}>{props.control.errors[props.name]}</span>
      }
    </>
  )
}
