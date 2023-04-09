import React from 'react'
import * as yup from 'yup';
import { AddEmployee, Employee } from 'services/employee/types';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { TextField } from '../../../components/Form/Input/TextField';
import { DateField } from '../../../components/Form/Input/DateField';
import { CurrencyField } from '../../../components/Form/Input/CurrencyField';

const fields: FormFields<AddEmployee> = {
  name: {
    label: "Nama",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Nama",
      }
    }
  },
  address: {
    label: "Alamat",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Alamat",
      }
    }
  },
  phone_number: {
    label: "Nomor Telepon",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Nomor Telepon",
      }
    }
  },
  entry_date: {
    label: "Tanggal Masuk",
    component: DateField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Tanggal Masuk",
      }
    }
  },
  exit_date: {
    label: "Tanggal Keluar",
    component: DateField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Tanggal Keluar",
      }
    }
  },
  total_saving: {
    label: "Total Simpanan",
    component: CurrencyField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Total Simpanan",
      }
    }
  },
}

type Props = {
  handleForm: (data: AddEmployee) => void,
  employee? : Employee;
};

const employeeSchema = yup.object().shape({
  name: yup.string().required('nama tidak boleh kosong'),
  address: yup.string().required('alamat tidak boleh kosong'),
  phone_number: yup
    .string()
    .required('nomor telepon tidak boleh kosong')
    .min(10, 'nomor telepon minimal 10 digit'),
  entry_date: yup.string().required('tanggal masuk tidak boleh kosong'),
  total_saving: yup.string().required('total simpanan tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddEmployee>;

const FormEmployee = ({handleForm, employee}: Props) => {
  const { control } = useForm<AddEmployee>({
    fields,
    validations: employeeSchema,
    defaultValue: employee,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormEmployee