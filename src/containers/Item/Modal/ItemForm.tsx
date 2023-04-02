import React from 'react'
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { AddItem, Item } from 'services/item/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { SupplierField } from 'src/components/Form/SupplierField';
import { Supplier } from 'services/supplier/types';
import { CategoryField } from 'src/components/Form/CategoryField';
import { Category } from 'services/category/types';

const formData = {
  fields: {

  },
  validation: {

  },
  defaultValue: {
    
  }
}

type Props = {
  handleForm: (data: AddItem) => void,
  handleCloseForm: () => void,
  item? : Item;
};

const itemSchema = yup.object().shape({
  brand: yup.string().required('Merek Tidak Boleh Kosong'),
  capital_price: yup.string().required('Harga Modal Tidak Boleh Kosong'),
  wholescale_price: yup.string().required('Harga Grosir Tidak Boleh Kosong'),
  stock: yup.string().required('Stok Tidak Boleh Kosong'),
});

const FormItem = ({ handleForm, handleCloseForm, item }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddItem>({
    defaultValues: item,
    resolver: yupResolver(itemSchema),
  });

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
        <CategoryField
          isMulti
          creatable
          label='Category'
          name='__categories__'
          defaultValue={item?.__categories__}
          onChange={(categories)=>{
            setValue('__categories__', categories as Category[]);
          }}
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
        <SupplierField
          isMulti={false}
          label='Supplier'
          name='__items__'
          defaultValue={item?.__supplier__}
          onChange={(supplier)=>{
            setValue('__supplier__', supplier as Supplier);
          }}
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
