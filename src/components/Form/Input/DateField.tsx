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
        defaultValue={props.defaultValue}
        onChange={(e)=> {
          handleChange(e.target.value);
        }}
      />
    </>
  )
}
