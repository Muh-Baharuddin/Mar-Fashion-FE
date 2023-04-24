import React from 'react'

export interface TextCommentProps {
  name: string;
  placeholder?: string;
  handleChange: (value: string | number) => void;
  innerRef: React.MutableRefObject<any>;
  defaultValue?: string;
}

export const TextComment = (props:TextCommentProps) => {
  const { innerRef, handleChange} = props;

  return (
    <>
      <textarea
        ref={innerRef}
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
