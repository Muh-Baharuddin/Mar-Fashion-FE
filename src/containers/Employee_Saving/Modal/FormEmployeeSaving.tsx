import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddEmployeeSaving, EmployeeSaving } from 'services/employee/types';
import Select, { SingleValue } from 'react-select'
import { getEmployees } from 'services/employee';

type Props = {
  handleForm: (data: AddEmployeeSaving) => void,
  handleCloseForm: () => void,
  employeeSaving? : EmployeeSaving;
};

const EmployeeQueryParams = {
  keywords: '',
  orderBy: 'name',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const FormComp = ({handleForm, handleCloseForm, employeeSaving}: Props) => {
  const { register, handleSubmit, setValue } = useForm<AddEmployeeSaving>({
    defaultValues: employeeSaving,
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
      </div>
      <div className="mb-3">
        <label className="form-label">
          Tipe
        </label>
        <input
          type="text"
          className="form-control"
          {...register('type', { required: true })}
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
          {...register('total', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Total Tabungan
        </label>
        <input
          type="text"
          className="form-control"
          {...register('description', { required: true })}
        />
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

export default FormComp