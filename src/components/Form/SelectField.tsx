import React from 'react'
import ReactSelect, { MultiValue, SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable';
import debounce from "lodash.debounce";
import { SelectBaseProps } from './types';

interface SelectValue<T>{
  value: T[keyof T];
  label: T[keyof T];
  __isNew__?: boolean;
}

interface Props<T> extends SelectBaseProps<T> {
  data: T[];
  handleInput?: (keywords: string) => void;
  handleChange?: (value:T | T[]) => void;
  keyValue?: keyof T;
  keyLabel?: keyof T;
}

export const SelectField = <T extends unknown>(props: Props<T>) => {
  const { data, name, keyLabel, keyValue, creatable, isMulti, defaultValue} = props;
  
  const toSelectValue = (d: T):SelectValue<T>  => {
    return {
      value: d[keyValue as keyof T],
      label: d[keyLabel  as keyof T],
    }
  } 

  const dataOptions = data && data.map(toSelectValue);
  let selectDefaultValue: SelectValue<T> |  Array<SelectValue<T>> | undefined = undefined;
  if(defaultValue && Array.isArray(defaultValue)) {
    selectDefaultValue = defaultValue.map(toSelectValue);
  } else if(defaultValue) {
    selectDefaultValue = toSelectValue(defaultValue);
  }

  const handleInputChange = debounce((keywords: string) => {
    props.handleInput && props.handleInput(keywords);
  }, 500);

  const generateData = (data: SelectValue<T>) : T => {
    const d =  {
      [keyLabel as keyof T]: data.label,
    } as T;

    if(!data.__isNew__){
      d[keyValue as keyof T] =  data.value;
    }

    return d;
  }

  const handleChange = (newValue: SingleValue<SelectValue<T>> | MultiValue<SelectValue<T>>) => {
    let data: T | T[];
    if (Array.isArray(newValue)) {
      data = newValue.map(generateData);
    } else {
      data = generateData(newValue as SelectValue<T>);
    }
    props.handleChange && props.handleChange(data as T);
  }

  const SelectComponent = creatable ?  CreatableSelect : ReactSelect;

  return (
    <SelectComponent
      isClearable
      isMulti={isMulti}
      name={name}
      onChange={handleChange}
      options={dataOptions}
      onInputChange={handleInputChange}
      defaultValue={selectDefaultValue}
      formatCreateLabel={(inputValue) => `Buat data baru: ${inputValue}`}
    />
  );
}

SelectField.defaultProps = {
  keyValue: "id",
  keyLabel: "name",
  isMulti: false,
  creatable: false,
}
