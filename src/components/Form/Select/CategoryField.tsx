import React, { useState } from 'react'
import { Category } from 'services/category/types';
import { getCategorys } from 'services/category';
import { SelectField } from './SelectField';
import { SelectFieldProps } from '../types';

export const CategoryField = (props: SelectFieldProps<Category>) => {
  const [params, setQueryParams] = useState({
    keywords: '',
    orderBy: 'name',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  });

  const { data } = getCategorys(params);
  const onInput = (keywords: string) => {
    setQueryParams(prev => ({
      ...prev,
      keywords,
    }));
  };

  return (
    <>
      <SelectField 
        creatable={true}
        isMulti={true}
        data={data?.data || []}
        defaultValue={props.defaultValue}
        handleInput={onInput}
        handleChange={props.onChange}
        {...props}
      />
    </>
  )
}
