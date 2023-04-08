import React, { useState } from 'react'
import { getItems } from 'services/item';
import { Item } from 'services/item/types';
import { SelectFieldProps } from '../types';
import { SelectField } from './SelectField';

export const ItemField = (props: SelectFieldProps<Item>) => {
  const [params, setQueryParams] = useState({
    keywords: '',
    orderBy: 'brand',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  });

  const { data } = getItems(params);
  const onChange = (data: Item | Item[]) => {
    props.onChange && props.onChange(data);
  };

  const onInput = (keywords: string) => {
    setQueryParams(prev => ({
      ...prev,
      keywords,
    }));
  };

  return (
    <>
      <label className="form-label">
        {props.label}
      </label>
      <SelectField 
        data={data?.data || []}
        defaultValue={props.defaultValue}
        handleInput={onInput}
        handleChange={onChange}
        keyLabel='brand'
        {...props}
      />
    </>
  )
}
