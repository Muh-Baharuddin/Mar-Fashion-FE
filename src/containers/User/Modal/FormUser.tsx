import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { TextField } from '../../../components/Form/Input/TextField';
import { AddUser, User } from 'services/user/types';

const fields: FormFields<AddUser> = {
  userName: {
    label: "Username",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Username",
      }
    }
  },
  password: {
    label: "Password",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Password",
      }
    }
  },
  role: {
    label: "Role",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Role",
      }
    }
  },
}

type Props = {
  handleForm: (data: AddUser) => void,
  user? : User;
};

const userSchema = yup.object().shape({
  userName: yup.string().required('username tidak boleh kosong'),
  password: yup.string().required('password tidak boleh kosong'),
  confirmPass: yup.string().required('konfirmasi password tidak boleh kosong'),
  role: yup.string().required('role tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddUser>;

const FormUser = ({handleForm, user}: Props) => {
  const { control } = useForm<AddUser>({
    fields,
    validations: userSchema,
    defaultValue: user,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormUser