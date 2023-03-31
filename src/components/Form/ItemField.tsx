import React, { useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { getItems } from 'services/item';
import { Item } from 'services/item/types';

interface FieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: Item[];
  onChange?: (items: Item[]) => void;
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

  const handleItemsChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      return {id: option.value, brand: option.label} as Item;
    });
    props.onChange && props.onChange(selectedValues);
  };

  return (
    <>
      <label className="form-label">
        {props.label}
      </label>
      <Select
        isMulti
        name={props.name}
        onInputChange={(keywords)=>{
          // TODO: debounce
          setQueryParams(prev=> {
            return {
              ...prev,
              keywords,
            }
          })
        }}
        options={itemsOptions}
        defaultValue={itemsDefaultValues}
        isClearable={true}
        onChange={handleItemsChange}
      />
    </>
  )
}
