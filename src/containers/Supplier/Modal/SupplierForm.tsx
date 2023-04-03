import React from 'react'
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { AddSupplier, Supplier } from 'services/supplier/types';
import { TextField } from 'src/components/Form/TextField';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';


type SupplierFormOriginal = Pick<Supplier, 'name' | 'address'>;
interface SupplierForm extends SupplierFormOriginal {
  input1: number;
  input2: number;
  input3: number;
}

const fields: FormFields<SupplierForm>= {
  name: {
    label: "Nama",
    component: TextField,
    props: (props) => {
      return {
        onChange: props.onChange,
        placeholder: "Nama"
      }
    },
  },
  address: {
    label: "Address",
    component: TextField,
    props: ({onChange}) => {
      return {
        onChange,
        placeholder: "Address"
      }
    },
  },
  input1: {
    label: "Input 1",
    component: TextField,
    props: ({onChange}) => {
      return {
        onChange,
        placeholder: "Input 1"
      }
    },
  },
  input2: {
    label: "Input 2",
    component: TextField,
    props: ({onChange}) => {
      return {
        onChange,
        placeholder: "Input 2"
      }
    },
  },
  input3: {
    label: "Input 3",
    component: TextField,
    props: ({onChange, ref}) => {
      return {
        onChange,
        placeholder: "Input 3",
        innerRef: ref,
      }
    },
    depends: [['input1', 'input2'], ({input1, input2}) => {
      return Number(input1) + Number(input2);
    }],
  },
};

type Props = {
  handleForm: (data: AddSupplier) => void,
  handleCloseForm: () => void,
  supplier? : Supplier;
};

const schema = yup.object().shape({
  name: yup.string().required('Nama Tidak Boleh Kosong'),
  address: yup.string().required('Alamat Tidak Boleh Kosong'),
  // city: yup.string().required('Kota Tidak Boleh Kosong'),
  // phone_number: yup
  //   .string()
  //   .required('Nomor Telepon Tidak Boleh Kosong')
  //   .min(10, 'Nomor Telepon Minimal 10 Digit'),
  // account_number: yup
  //   .string()
  //   .required('Nomor Rekening Tidak Boleh Kosong')
  //   .min(10, 'Nomor Rekening Minimal 10 Digit'),
  // account_owner: yup.string().required('Nama Pemilik Rekening Tidak Boleh Kosong'),
  // bank: yup.string().required('Bank Tidak Boleh Kosong'),
}) as yup.ObjectSchema<SupplierForm>;

const SupplierForm = ({handleForm, handleCloseForm, supplier}: Props) => {
  const { control } = useForm<SupplierForm>({
    fields,
    validations: schema,
  });

  return (
    <DynamicForm
      control={control}
      onSubmit={(data)=> console.log("data", data)}
    />
  )
}

export default SupplierForm;