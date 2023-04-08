import React from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { AddEmployee, Employee } from 'services/employee/types';
import { DynamicForm, FormFields } from 'src/components/DynamicForm';
import { TextField } from '../../../components/Form/TextField';

const fields: FormFields<AddEmployee> = {
  name: {
    label: "Nama",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Nama",
        type:"text"
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
        type:"text"
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
        type:"text"
      }
    }
  },
  entry_date: {
    label: "Tanggal Masuk",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Tanggal Masuk",
        type:"date"
      }
    }
  },
  exit_date: {
    label: "Tanggal Keluar",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Tanggal Keluar",
        type:"date"
      }
    }
  },
  total_saving: {
    label: "Total Simpanan",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Total Simpanan",
        type:"number",
        min:"0"
      }
    }
  },
}

type Props = {
  handleForm: (data: AddEmployee) => void,
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