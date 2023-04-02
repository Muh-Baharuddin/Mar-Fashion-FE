import React from 'react'

interface TextFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const TextField = (props:TextFieldProps) => {
  const { label, name, placeholder, onChange} = props;
  return (
    <>
      { props.label && (
        <label className="form-label">
          {props.label}
        </label>
      )}
      
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e)=> {
          onChange(e.target.value);
        }}
      />
    </>
  )
}
