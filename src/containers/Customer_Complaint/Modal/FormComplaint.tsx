import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { TextField } from '../../../components/Form/Input/TextField';
import { TextComment } from '../../../components/Form/Input/TextComment';
import { AddCustomerComplaint, Customer_Complaint } from 'services/customer_complaint/types';

const fields: FormFields<AddCustomerComplaint> = {
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
  city: {
    label: "Kota",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Kota",
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
  handleForm: (data: AddCustomerComplaint) => void,
  complaint? : Customer_Complaint;
};

const complaintSchema = yup.object().shape({
  name: yup.string().required('nama tidak boleh kosong'),
  address: yup.string().required('alamat tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddCustomerComplaint>;

const FormComplaint = ({handleForm, complaint}: Props) => {
  const { control } = useForm<AddCustomerComplaint>({
    fields,
    validations: complaintSchema,
    defaultValue: complaint,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormComplaint