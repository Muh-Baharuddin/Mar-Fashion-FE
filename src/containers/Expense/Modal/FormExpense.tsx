import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { AddExpense, Expense } from 'services/expense/types';
import { TextComment } from '../../../components/Form/Input/TextComment';
import { DateField } from '../../../components/Form/Input/DateField';
import { CurrencyField } from '../../../components/Form/Input/CurrencyField';

const fields: FormFields<AddExpense> = {
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
  handleForm: (data: AddExpense) => void,
  expense? : Expense;
};

const ExpenseSchema = yup.object().shape({
  date: yup.string().required('tanggal tidak boleh kosong'),
  total: yup.string().required('total tidak boleh kosong'),
  description: yup.string().required('Keterangan tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddExpense>;

const FormExpense = ({handleForm, expense}: Props) => {
  const { control } = useForm<AddExpense>({
    fields,
    validations: ExpenseSchema,
    defaultValue: expense,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormExpense