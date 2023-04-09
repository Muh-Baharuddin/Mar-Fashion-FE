import React from 'react'
import { TextFieldProps } from './TextField';

export interface DateFieldProps extends TextFieldProps{}

export const DateField = (props:DateFieldProps) => {
  const { innerRef, handleChange} = props;
  
  return (
    <>
      <input
        ref={innerRef}
        type="date"
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={props.defaultValue ? new Date(props.defaultValue).toISOString().split('T')[0] : " "}
        onChange={(e)=> {
          handleChange(e.target.value);
        }}
      />
    </>
  )
}
