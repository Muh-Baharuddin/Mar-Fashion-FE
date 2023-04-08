import React from 'react'

export interface TextFieldProps {
  name: string;
  placeholder?: string;
  handleChange: (value: string | number) => void;
  innerRef: React.MutableRefObject<any>;
  defaultValue?: string;
}

export const TextField = (props:TextFieldProps) => {
  const { innerRef, handleChange} = props;

  return (
    <>
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
