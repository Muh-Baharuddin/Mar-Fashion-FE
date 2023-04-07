import React from 'react'
import numeral from 'numeral'

interface NumberFieldProps {
  name: string;
  placeholder?: string;
  handleChange: (value: number) => void;
  innerRef: React.MutableRefObject<any>;
  defaultValue?: string;
  currency: boolean;
}

export const NumberField = (props:NumberFieldProps) => {
  const { innerRef, handleChange, currency} = props;

  const formatNumber = (value: number): string => {
    return currency ? numeral(value).format('0,0') : value.toString();
  }
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
      {currency && <span>Rp {formatNumber(parseInt(props.defaultValue || '0', 10))}</span>}
    </>
  )
}
