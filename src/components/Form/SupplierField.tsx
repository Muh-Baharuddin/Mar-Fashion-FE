import React, { useState } from 'react'
import { SelectFieldProps } from './types';
import { getSuppliers } from 'services/supplier';
import { Supplier } from 'services/supplier/types';
import { SelectField } from './SelectField';

export const SupplierField = (props: SelectFieldProps<Supplier>) => {
  const [params, setQueryParams] = useState({
    keywords: '',
    orderBy: 'name',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  });

  const { data } = getSuppliers(params);
  const onChange = (data: Supplier | Supplier[]) => {
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
      <SelectField 
        data={data?.data || []}
        defaultValue={props.defaultValue}
        handleInput={onInput}
        handleChange={onChange}
        {...props}
      />
    </>
  )
}
