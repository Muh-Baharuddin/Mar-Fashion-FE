import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddEmployeeSaving, EmployeeSaving } from 'services/employee/types';
import Select, { SingleValue } from 'react-select'
import { getEmployees } from 'services/employee';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  handleForm: (data: AddEmployeeSaving) => void,
  handleCloseForm: () => void,
  employeeSaving? : EmployeeSaving;
};

type SavingType = {
  SIMPANAN: string;
  AMBILAN: string;
}

const savingType: SavingType = {
  SIMPANAN: "SIMPANAN",
  AMBILAN: "AMBILAN"
}


const EmployeeQueryParams = {
  keywords: '',
  orderBy: 'name',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const employeeSavingSchema = yup.object().shape({
  date: yup.string().required('Tanggal Tidak Boleh Kosong'),
  total: yup.string().required('Total Tidak Boleh Kosong'),
  description: yup.string().required('Keterangan Tidak Boleh Kosong'),
});

const FormEmployeeSaving = ({handleForm, handleCloseForm, employeeSaving}: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddEmployeeSaving>({
    defaultValues: employeeSaving,
    resolver: yupResolver(employeeSavingSchema),
  });
  const [isClearable, setIsClearable] = useState(true);
  const { data } = getEmployees(EmployeeQueryParams);

  const empSavingDefaultValue = employeeSaving?.__employee__ ? {
    value: employeeSaving.__employee__.id,
    label: employeeSaving.__employee__.name,
  } : null;

  const employeeOptions = 
    data?.data.map((employee) => ({
      value: employee.id,
      label: employee.name,
    }));

  const handleEmployeeChange = (newValue: SingleValue<{ value: string | undefined; label: string | undefined; }>) => {
    const selectedValue = {id: newValue?.value, name: newValue?.label}
    setValue('__employee__', selectedValue);
  };

  const typeDefaultValue = employeeSaving?.type ? {
    value: employeeSaving.type,
    label: employeeSaving.type,
  } : null;

  const typeOptions = Object.keys(savingType).map((key) => ({ value: key, label: key }));

  const handleTypeChange = (newValue: SingleValue<{ value: string | undefined; label: string | undefined; }>) => {
    const selectedValue = newValue?.value
    setValue('type', selectedValue);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div className="mb-3">
        <label className="form-label">
          Tanggal
        </label>
        <input
          type="date"
          className="form-control"
          {...register('date', { required: true })}
        />
        {errors.date && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.date.message}
          </span>
        }
      </div>
      <div className="mb-3">
        <label className="form-label">
          Tipe
        </label>
        <Select
          options={typeOptions}
          defaultValue={typeDefaultValue}
          isClearable={isClearable}
          onChange={handleTypeChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Total
        </label>
        <input
          type="number"
          min={0}
          className="form-control"
          {...register('total', { required: true, valueAsNumber: true })}
        />
        {errors.total && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.total.message}
          </span>
        }
      </div>
      <div className="mb-3">
        <label className="form-label">
          Keterangan
        </label>
        <input
          type="text"
          className="form-control"
          {...register('description', { required: true })}
        />
        {errors.description && 
          <span role="alert" style={{ color: 'red' }}>
            {errors.description.message}
          </span>
        }
      </div>
      <div className="mb-3">
        <label className="form-label">
          Karyawan
        </label>
        <Select
          options={employeeOptions}
          defaultValue={empSavingDefaultValue}
          isClearable={isClearable}
          onChange={handleEmployeeChange}
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

export default FormEmployeeSaving