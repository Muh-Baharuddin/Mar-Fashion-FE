import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { getCategorys } from 'services/category';
import { AddItem, Item } from 'services/item/types';
import { getSuppliers } from 'services/supplier';
import Select, { MultiValue, SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable';

type Props = {
  handleForm: (data: AddItem) => void,
  handleCloseForm: () => void,
  item? : Item;
};

const queryParams = {
  keywords: '',
  orderBy: 'name',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const FormComp = ({ handleForm, handleCloseForm, item }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddItem>({
    defaultValues: item,
  });
  const [isClearable, setIsClearable] = useState(true);
  
  const { data: categoryData } = getCategorys(queryParams);
  const { data: supplierData } = getSuppliers(queryParams);

  const categoryDefaultValues = item?.__categories__?.map((category) => ({
    value: category.id ? category.id : category.name,
    label: category.name,
  }))

  const categoryOptions = 
  categoryData?.data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleCategoryChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      if (option.value === option.label) {
        return { name: option.label };
      } else {
        return { id: option.value, name: option.label };
      }
    });
    setValue('__categories__', selectedValues);
  };

  const supplierDefaultValue = item?.__supplier__ ? {
    value: item.__supplier__.id,
    label: item.__supplier__.name,
  } : null;

  const supplierOptions = 
    supplierData?.data.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    }));

  const handleSupplierChange = (newValue: SingleValue<{ value: string | undefined; label: string | undefined; }>) => {
    const selectedValue = {id: newValue?.value, name: newValue?.label}
    setValue('__supplier__', selectedValue);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div className="mb-3">
        <label className="form-label">
          Merek
        </label>
        <input
          type="text"
          className="form-control"
          aria-invalid={errors.brand ? "true" : "false"}
          {...register('brand', { required: true })}
        />
        {errors.brand && errors.brand.type === "required" && (
          <span role="alert" style={{color:'red'}}>Brand Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Kategori
        </label>
        <CreatableSelect
          isMulti
          options={categoryOptions}
          defaultValue={categoryDefaultValues}
          isClearable={isClearable}
          onChange={handleCategoryChange}
          formatCreateLabel={(inputValue) => `Buat kategori baru: ${inputValue}`}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Harga Modal
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          aria-invalid={errors.capital_price ? "true" : "false"}
          {...register('capital_price', { required: true })}
        />
        {errors.capital_price && errors.capital_price.type === "required" && (
          <span role="alert" style={{color:'red'}}>Harga Modal Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Harga Grosir
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          aria-invalid={errors.wholescale_price ? "true" : "false"}
          {...register('wholescale_price', { required: true })}
        />
        {errors.wholescale_price && errors.wholescale_price.type === "required" && (
          <span role="alert" style={{color:'red'}}>Harga Grosir Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Stok
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          aria-invalid={errors.stock ? "true" : "false"}
          {...register('stock', { required: true })}
        />
        {errors.stock && errors.stock.type === "required" && (
          <span role="alert" style={{color:'red'}}>Stok Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Supplier
        </label>
        <Select
          options={supplierOptions}
          defaultValue={supplierDefaultValue}
          isClearable={isClearable}
          onChange={handleSupplierChange}
        />
      </div>
      <Button variant="primary" onClick={() => handleForm} type="submit">
        Submit
      </Button>
      <Button className='mx-2' variant="secondary" onClick={handleCloseForm}>
        Close
      </Button>
    </form>
  )
}

export default FormComp