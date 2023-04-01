import React, { useState } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { getItems } from 'services/item';
import { Item } from 'services/item/types';
import debounce from "lodash.debounce";

interface FieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: Item[];
  onChange?: (items: Item[]) => void;
  isMulti: boolean;
}

export const ItemField = (props: FieldProps) => {
  const [params, setQueryParams] = useState({
    keywords: '',
    orderBy: 'brand',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  });

  const { data: itemsData } = getItems(params);
  const itemsDefaultValues = props.defaultValue?.map((item) => ({
    value: item.id,
    label: item.brand,
  }))

  const itemsOptions = itemsData?.data.map((item) => ({
    value: item.id,
    label: item.brand,
  }));

  const handleMultiChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      return {id: option.value, brand: option.label} as Item;
    });
    props.onChange && props.onChange(selectedValues);
  };

  const handleInputChange = debounce((keywords: string) => {
    setQueryParams(prev => ({
      ...prev,
      keywords,
    }));
  }, 500);

  return (
    <>
      <label className="form-label">
        {props.label}
      </label>
      <Select
        isMulti
        name={props.name}
        onInputChange={handleInputChange}
        options={itemsOptions}
        defaultValue={itemsDefaultValues}
        isClearable={true}
        onChange={handleMultiChange}
      />
    </>
  )
}
