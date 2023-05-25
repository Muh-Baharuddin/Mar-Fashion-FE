import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { AddIncome, Income } from 'services/income/types';
import { TextComment } from '../../../components/Form/Input/TextComment';
import { DateField } from '../../../components/Form/Input/DateField';
import { CurrencyField } from '../../../components/Form/Input/CurrencyField';

const fields: FormFields<AddIncome> = {
  date: {
    label: "Tanggal",
    component: DateField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Tanggal",
      }
    }
  },
  total: {
    label: "Total",
    component: CurrencyField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Total",
      }
    }
  },
  description: {
    label: "Keterangan",
    component: TextComment,
    props: (props) => {
      return {
        ...props,
        placeholder: "Keterangan",
      }
    }
  },
}

type Props = {
  handleForm: (data: AddIncome) => void,
  income? : Income;
};

const incomeSchema = yup.object().shape({
  date: yup.string().required('tanggal tidak boleh kosong'),
  total: yup.string().required('total tidak boleh kosong'),
  description: yup.string().required('Keterangan tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddIncome>;

const FormIncome = ({handleForm, income}: Props) => {
  const { control } = useForm<AddIncome>({
    fields,
    validations: incomeSchema,
    defaultValue: income,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormIncome