import React from 'react'
import CurrencyInput from 'react-currency-input-field';
import { TextFieldProps } from './TextField';

interface CurrencyFieldProps extends TextFieldProps{}

export const CurrencyField = (props: CurrencyFieldProps) => {
  const { innerRef, handleChange} = props;
  return (
    <CurrencyInput
      prefix='Rp. '
      ref={innerRef}
      name={props.name}
      className="form-control"
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      allowNegativeValue={false}
      decimalsLimit={2}
      onValueChange={(value) =>{
        if (value !== undefined) {
          const parsedValue = parseInt(value);
          handleChange(parsedValue);
        }
      }}
    />
  )
}
