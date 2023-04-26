import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { TextField } from '../../../components/Form/Input/TextField';
import { AddCustomerComplaint, Customer_Complaint } from 'services/customer_complaint/types';
import { AddStoreLocation, StoreLocation } from 'services/store_location/types';

const fields: FormFields<AddStoreLocation> = {
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
}

type Props = {
  handleForm: (data: AddStoreLocation) => void,
  storeLocation? : StoreLocation;
};

const complaintSchema = yup.object().shape({
  name: yup.string().required('nama tidak boleh kosong'),
  address: yup.string().required('alamat tidak boleh kosong'),
}) as unknown as yup.ObjectSchema<AddStoreLocation>;

const FormStoreLocation = ({handleForm, storeLocation}: Props) => {
  const { control } = useForm<AddStoreLocation>({
    fields,
    validations: complaintSchema,
    defaultValue: storeLocation,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default FormStoreLocation