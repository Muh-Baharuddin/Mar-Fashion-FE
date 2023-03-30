import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddEmployee, Employee } from 'services/employee/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  handleForm: (data: AddEmployee) => void,
  handleCloseForm: () => void,
  employee? : Employee;
};

const employeeSchema = yup.object().shape({
  name: yup.string().required('Nama Tidak Boleh Kosong'),
  address: yup.string().required('Alamat Tidak Boleh Kosong'),
  phone_number: yup
    .string()
    .required('Nomor Telepon Tidak Boleh Kosong')
    .min(10, 'Nomor Telepon Minimal 10 Digit'),
  entry_date: yup.string().required('Tanggal Masuk Tidak Boleh Kosong'),
  total_saving: yup.string().required('Total Tabungan Tidak Boleh Kosong'),
});

const FormComp = ({handleForm, handleCloseForm, employee}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddEmployee>({
    defaultValues: employee,
    resolver: yupResolver(employeeSchema),
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
          placeholder="Nama Karyawan"
          {...register('name', { 
            required: true,
          })}
        />
        {errors.name && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.name.message}
          </span>
        }
      </div>
      <div className="mb-3">
        <label className="form-label">
          Alamat
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Alamat Karyawan"
          {...register('address', { required: true })}
        />
        {errors.address && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.address.message}
          </span>
        }
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Telepon
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nomor Telepon Karyawan"
          {...register('phone_number', { required: true })}
        />
        {errors.phone_number && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.phone_number.message}
          </span>
        }
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
        {errors.entry_date && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.entry_date.message}
          </span>
        }
      </div>
      <div className="mb-3">
        <label className="form-label">
          Tanggal Keluar
        </label>
        <input
          type="date"
          className="form-control"
          {...register('exit_date', { value: null})}
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
          placeholder="Tabungan Karyawan"
          {...register('total_saving', { required: true, valueAsNumber: true, })}
        />
        {errors.total_saving && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.total_saving.message}
          </span>
        }
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