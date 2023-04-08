import React from 'react'
import { TextFieldProps } from './TextField';

interface NumberFieldProps extends TextFieldProps{}

export const NumberField = (props:NumberFieldProps) => {
  const { innerRef, handleChange} = props;

  return (
    <>
      <input
        ref={innerRef}
        type="number"
        min="0"
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={(e)=> {
          const value = parseInt(e.target.value, 10);
          handleChange(value);
        }}
      />
    </>
  )
}
