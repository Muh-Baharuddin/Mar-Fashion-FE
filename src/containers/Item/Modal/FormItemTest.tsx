import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddItem, Item } from 'services/item/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectField, FieldProps } from 'src/components/Form/SelectField';

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

const FormItemTest = ({ handleForm, handleCloseForm, item }: Props) => {
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
        <SelectField
            creatable={true}
            isMulti={true}
            label='Kategori'
            name='__categories__'
            defaultValueArray={item?.__categories__}
            onChange={(category)=>{
              setValue('__categories__', category);
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
        <SelectField
          isMulti={false}
          label='Supplier'
          name='__items__'
          defaultValue={item?.__supplier__}
          onChange={(suppliers)=>{
            setValue('__supplier__', suppliers);
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

export default FormItemTest
