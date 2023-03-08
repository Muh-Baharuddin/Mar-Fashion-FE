import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddSupplier, Supplier } from 'services/supplier/types';

type Props = {
  handleForm: (data: AddSupplier) => void,
  handleCloseForm: () => void,
  supplier? : Supplier;
};

const FormComp = ({handleForm, handleCloseForm, supplier}: Props) => {
  const { register, handleSubmit } = useForm<AddSupplier>({
    defaultValues: supplier,
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
          {...register('nama', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Alamat
        </label>
        <input
          type="text"
          className="form-control"
          {...register('alamat', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Telepon
        </label>
        <input
          type="text"
          className="form-control"
          {...register('nomor_telepon', { required: true })}
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