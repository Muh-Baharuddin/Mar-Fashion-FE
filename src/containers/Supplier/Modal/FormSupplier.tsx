import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Controller, useForm } from 'react-hook-form'
import { AddSupplier, Supplier } from 'services/supplier/types';
import Select, { MultiValue } from 'react-select'
import { getItems } from 'services/item';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'src/components/Form/TextField';
import { ItemField } from 'src/components/Form/ItemField';

type Props = {
  handleForm: (data: AddSupplier) => void,
  handleCloseForm: () => void,
  supplier? : Supplier;
};

const queryParams = {
  keywords: '',
  orderBy: 'brand',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const schema = yup.object().shape({
  name: yup.string().required('Nama Tidak Boleh Kosong'),
  address: yup.string().required('Alamat Tidak Boleh Kosong'),
  city: yup.string().required('Kota Tidak Boleh Kosong'),
  phone_number: yup
    .string()
    .required('Nomor Telepon Tidak Boleh Kosong')
    .min(10, 'Nomor Telepon Minimal 10 Digit'),
  account_number: yup
    .string()
    .required('Nomor Rekening Tidak Boleh Kosong')
    .min(10, 'Nomor Rekening Minimal 10 Digit'),
  account_owner: yup.string().required('Nama Pemilik Rekening Tidak Boleh Kosong'),
  bank: yup.string().required('Bank Tidak Boleh Kosong'),
});

const FormSupplier = ({handleForm, handleCloseForm, supplier}: Props) => {
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<AddSupplier>({
    defaultValues: supplier,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div className="mb-3">
        <label className="form-label">
          Nama
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nama Supplier"
          {...register('name', { required: true })}
        />
        {/* <TextField
          label='Nama Supplier'
          placeholder="Nama Supplier"
          {...register('name', { required: true })}
        /> */}
        {/* <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} />}
        /> */}
        {errors.name && <span role="alert" style={{ color: 'red' }}>{errors.name.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Alamat
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Alamat Supplier"
          {...register('address', { required: true })}
        />
        {errors.address && <span role="alert" style={{ color: 'red' }}>{errors.address.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Kota
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Kota Supplier"
          {...register('city', { required: true })}
        />
        {errors.city && <span role="alert" style={{ color: 'red' }}>{errors.city.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Telepon
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nomor Telepon Supplier"
          {...register('phone_number', { required: true, minLength: 10})}
        />
        {errors.phone_number && <span role="alert" style={{ color: 'red' }}>{errors.phone_number.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Rekening
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nomor Rekening Supplier"
          {...register('account_number', { required: true, minLength: 10 })}
        />
        {errors.account_number && <span role="alert" style={{ color: 'red' }}>{errors.account_number.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Rekening Atas Nama
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Rekening Atas Nama Supplier"
          {...register('account_owner', { required: true })}
        />
        {errors.account_owner && <span role="alert" style={{ color: 'red' }}>{errors.account_owner.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Bank
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Contoh: Mandiri"
          {...register('bank', { required: true })}
        />
        {errors.bank && <span role="alert" style={{ color: 'red' }}>{errors.bank.message}</span>}
      </div>
      <div className="mb-3">
        {/* <label className="form-label">
          Barang
        </label>
        <Select
          isMulti
          options={itemsOptions}
          defaultValue={itemsDefaultValues}
          isClearable={isClearable}
          onChange={handleItemsChange}
        /> */}
        <ItemField
          label='Barang'
          name='__items__'
          defaultValue={supplier?.__items__}
          onChange={(items)=>{
            setValue('__items__', items);
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

export default FormSupplier