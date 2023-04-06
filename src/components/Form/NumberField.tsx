import React from 'react'

interface NumberFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  handleChange: (value: number) => void;
  innerRef: React.MutableRefObject<any>;
  defaultValue?: string;
}

export const NumberField = (props:NumberFieldProps) => {
  const { innerRef, handleChange} = props;
  return (
    <>
      { props.label && (
        <label className="form-label">
          {props.label}
        </label>
      )}
      
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
