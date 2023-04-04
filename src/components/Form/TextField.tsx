import React from 'react'

interface TextFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  handleChange: (value: string) => void;
  innerRef: React.MutableRefObject<any>;
  defaultValue?: string;
}

export const TextField = (props:TextFieldProps) => {
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
        type="text"
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
