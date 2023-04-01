import React, { useState } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable';
import debounce from "lodash.debounce";
import { getCategorys } from 'services/category';
import { getSuppliers } from 'services/supplier';

export interface FieldProps<T> {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: T;
  defaultValueArray?: T[];
  onChange?: (data: T | T[]) => void;
  isMulti?: boolean;
  creatable? : boolean;
}

export const SelectField = <T extends unknown>(props: FieldProps<any>) => {
  const [params, setQueryParams] = useState({
    keywords: '',
    orderBy: 'name',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  });

  const { data: categoryData } = getCategorys(params);
  const { data: supplierData } = getSuppliers(params);

  const DefaultValuesArray = props.defaultValueArray?.map((data) => ({
    value: data.id,
    label: data.brand,
  }))

  const DefaultValue = props.defaultValue? {
    value: props.defaultValue.id,
    label: props.defaultValue.name,
  } : null;

  const CategoryOptions = categoryData?.data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const supplierOptions = supplierData?.data.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    }));

  const handleMultiChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      return {id: option.value, brand: option.label};
    });
    props.onChange && props.onChange(selectedValues);
  };

  const handleCategoryChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      if (option.value === option.label) {
        return { name: option.label };
      } else {
        return { id: option.value, name: option.label };
      }
    });
    props.onChange && props.onChange(selectedValues);
  };

  const handleSingleChange = (newValue: SingleValue<{ value: string | undefined; label: string | undefined; }>) => {
    const selectedValue = {id: newValue?.value, brand: newValue?.label}
    props.onChange && props.onChange(selectedValue);
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
      { props.creatable && props.isMulti ?
        <CreatableSelect 
          isMulti
          name={props.name}
          onInputChange={handleInputChange}
          options={CategoryOptions}
          defaultValue={DefaultValuesArray}
          isClearable={true}
          onChange={handleMultiChange}
          formatCreateLabel={(inputValue) => `Buat kategori baru: ${inputValue}`}
        /> 
        : props.isMulti ?
          <Select
            isMulti
            name={props.name}
            onInputChange={handleInputChange}
            options={CategoryOptions}
            defaultValue={DefaultValuesArray}
            isClearable={true}
            onChange={handleMultiChange}
          /> :
          <Select
            name={props.name}
            onInputChange={handleInputChange}
            options={supplierOptions}
            defaultValue={DefaultValue}
            isClearable={true}
            onChange={handleSingleChange}
          />
      }
    </>
  )
}
