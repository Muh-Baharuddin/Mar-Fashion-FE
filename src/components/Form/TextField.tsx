import React from 'react'

interface TextFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
}
export const TextField = React.forwardRef((props:TextFieldProps, ref) => {
  const { label, name, placeholder, ...others } = props;
  console.log(props)
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
        {...others}
      />
    </>
  )
})
