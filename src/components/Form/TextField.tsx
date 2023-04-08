import React from 'react'

interface TextFieldProps {
  name: string;
  placeholder?: string;
  handleChange: (value: string) => void;
  innerRef: React.MutableRefObject<any>;
  defaultValue?: string;
  type: React.HTMLInputTypeAttribute;
  min?: string | number;
}

export const TextField = (props:TextFieldProps) => {
  const { innerRef, handleChange} = props;

  return (
    <>
      <input
        ref={innerRef}
        type={props.type}
        min={props.min}
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
