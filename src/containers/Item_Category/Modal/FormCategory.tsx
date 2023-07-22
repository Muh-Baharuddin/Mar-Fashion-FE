import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { TextField } from '../../../components/Form/Input/TextField';
import { AddCategory, Category } from 'services/category/types';

const fields: FormFields<AddCategory> = {
  name: {
    label: "Nama Kategori",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Nama Kategori",
      }
    }
  },
}

type Props = {
  handleForm: (data: AddCategory) => void,
  category? : Category;
};

const CategorySchema = yup.object().shape({
  name: yup.string().required('nama kategori tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddCategory>;

const FormCategory = ({handleForm, category}: Props) => {
  const { control } = useForm<AddCategory>({
    fields,
    validations: CategorySchema,
    defaultValue: category,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormCategory