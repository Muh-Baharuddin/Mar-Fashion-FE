import React from 'react'
import * as yup from 'yup';
import { DynamicForm, FormFields, useForm } from 'src/components/DynamicForm';
import { AddSale, Sale } from 'services/sale/types';
import { TextField } from '../../../components/Form/Input/TextField';
import { NumberField } from '../../../components/Form/Input/NumberField';
import { DateField } from '../../../components/Form/Input/DateField';
import { ItemField } from '../../../components/Form/Select/ItemField';
import { CurrencyField } from '../../../components/Form/Input/CurrencyField';

const fields: FormFields<AddSale> = {
  invoice: {
    label: "invoice",
    component: NumberField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Invoice",
      }
    }
  },
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
  customer: {
    label: "Pelanggan",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Nama pelanggan",
      }
    }
  },
  __items__: {
    label: "Barang",
    component: ItemField,
    props: (props) => {
      return {
        ...props,
      }
    }
  },
  unit: {
    label: "Satuan",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Satuan",
      }
    }
  },
  amount: {
    label: "Jumlah",
    component: NumberField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Jumlah",
      }
    }
  },
  total: {
    label: "Total",
    component: CurrencyField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Total"
      }
    }
  },
}

type Props = {
  handleForm: (data: AddSale) => void,
  sale? : Sale;
};

const saleSchema = yup.object().shape({
  date: yup.string().required('tanggal Tidak Boleh Kosong'),
  __items__: yup.array().required('Barang Tidak Boleh Kosong'),
  unit: yup.string().required('Satuan Tidak Boleh Kosong'),
  amount: yup.string().required('Jumlah Tidak Boleh Kosong'),
  total: yup.string().required('Total Tidak Boleh Kosong'),
}) as unknown as yup.ObjectSchema<AddSale>;

const SaleForm = ({ handleForm, sale }: Props) => {
  const { control } = useForm<AddSale>({
    fields,
    validations: saleSchema,
    defaultValue: sale,
  });
  
  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default SaleForm
