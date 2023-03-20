import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { getCategorys } from 'services/category';
import { AddItem, Item, RawData } from 'services/item/types';
import { getSuppliers } from 'services/supplier';
import Select, { MultiValue } from 'react-select'

type Props = {
  handleForm: (data: AddItem) => void,
  handleCloseForm: () => void,
  item? : Item;
};

type Option = {
  value: string;
  label: string;
}

const queryParams = {
  keywords: '',
  orderBy: 'name',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const FormComp = ({ handleForm, handleCloseForm, item }: Props) => {
  const { register, handleSubmit, setValue } = useForm<AddItem>({
    defaultValues: item,
  });
  const [isClearable, setIsClearable] = useState(true);
  
  const { data: categoryData } = getCategorys(queryParams);
  const { data: supplierData } = getSuppliers(queryParams);

  const categoryOptions = 
  categoryData?.data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleCategoryChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => ({ id: option.value, name: option.label }));
    setValue('__categories__', selectedValues);
  };

  const supplierOptions = 
    supplierData?.data.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    }));

  const handleSupplierChange = (selectedOption: Option | null) => {
    setValue('__supplier__', selectedOption?.value);
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
          {...register('brand', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Kategori
        </label>
        <Select
          isMulti
          options={categoryOptions}
          isClearable={isClearable}
          onChange={handleCategoryChange}
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
          {...register('capital_price', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Harga Grosir
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          {...register('wholescale_price', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Stok
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          {...register('stock', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Supplier
        </label>
        <Select
          options={supplierOptions}
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