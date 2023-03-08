import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddEmployee, Employee } from 'services/employee/types';

type Props = {
  handleForm: (data: AddEmployee) => void,
  handleCloseForm: () => void,
  employee? : Employee;
};

const FormComp = ({handleForm, handleCloseForm, employee}: Props) => {
  const { register, handleSubmit } = useForm<AddEmployee>({
    defaultValues: employee,
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
          {...register('name', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Alamat
        </label>
        <input
          type="text"
          className="form-control"
          {...register('address', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Telepon
        </label>
        <input
          type="text"
          className="form-control"
          {...register('phone_number', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Tanggal Masuk
        </label>
        <input
          type="date"
          className="form-control"
          {...register('entry_date', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Tanggal Keluar
        </label>
        <input
          type="date"
          className="form-control"
          {...register('exit_date', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Total Tabungan
        </label>
        <input
          type="number"
          min={0}
          className="form-control"
          {...register('total_saving', { required: true })}
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