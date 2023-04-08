import React from 'react'
import CurrencyInput from 'react-currency-input-field';

interface CurrencyFieldProps {
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  innerRef: React.MutableRefObject<any>;
  handleChange: (value?: string) => void;
}

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
        handleChange(value)
      }}
    />
  )
}
