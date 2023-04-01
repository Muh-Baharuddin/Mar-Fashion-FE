import React, { useState } from 'react'
import Select, { MultiValue } from 'react-select'
import debounce from "lodash.debounce";
import { FieldProps } from './types';
import { Category } from 'services/category/types';
import CreatableSelect from 'react-select/creatable';
import { getCategorys } from 'services/category';

export const CategoryField = (props: FieldProps<Category>) => {
  const [params, setQueryParams] = useState({
    keywords: '',
    orderBy: 'name',
    orderType: 'ASC',
    page: 1,
    limit: 10,
  });

  const { data: categoryData } = getCategorys(params);

  const categoryDefaultValues = props.defaultValueArray?.map((data) => ({
    value: data.id,
    label: data.name,
  }))

  const CategoryOptions = categoryData?.data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleCategoryChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      if (option.value === option.label) {
        return { name: option.label } as Category;
      } else {
        return { id: option.value, name: option.label } as Category;
      }
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
        <CreatableSelect 
          isMulti
          name={props.name}
          onInputChange={handleInputChange}
          options={CategoryOptions}
          defaultValue={categoryDefaultValues}
          isClearable={true}
          onChange={handleCategoryChange}
          formatCreateLabel={(inputValue) => `Buat kategori baru: ${inputValue}`}
        />
    </>
  )
}
