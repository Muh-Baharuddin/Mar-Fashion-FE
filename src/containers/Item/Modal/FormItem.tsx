import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { getCategorys } from 'services/category';
import { AddItem, Item } from 'services/item/types';
import { getSuppliers } from 'services/supplier';
import Select, { MultiValue, SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const itemSchema = yup.object().shape({
  brand: yup.string().required('Merek Tidak Boleh Kosong'),
  capital_price: yup.string().required('Harga Modal Tidak Boleh Kosong'),
  wholescale_price: yup.string().required('Harga Grosir Tidak Boleh Kosong'),
  stock: yup.string().required('Stok Tidak Boleh Kosong'),
});

const FormItem
 = ({ handleForm, handleCloseForm, item }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddItem>({
    defaultValues: item,
    resolver: yupResolver(itemSchema),
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
        {errors.brand && <span role="alert" style={{ color: 'red' }}>{errors.brand.message}</span>}
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
          aria-invalid={errors.__categories__ ? "true" : "false"}
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
        {errors.capital_price && <span role="alert" style={{ color: 'red' }}>{errors.capital_price.message}</span>}
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
        {errors.wholescale_price && <span role="alert" style={{ color: 'red' }}>{errors.wholescale_price.message}</span>}
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
        {errors.stock && <span role="alert" style={{ color: 'red' }}>{errors.stock.message}</span>}
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

export default FormItem
