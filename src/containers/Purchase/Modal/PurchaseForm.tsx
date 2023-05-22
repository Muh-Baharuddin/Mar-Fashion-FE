import React from 'react'
import * as yup from 'yup';
import { AddPurchase, Purchase } from 'services/purchase/types';
import { DynamicForm, FormFields, useForm } from '../../../components/DynamicForm';
import { TextField } from '../../../components/Form/Input/TextField';
import { DateField } from '../../../components/Form/Input/DateField';
import { ItemField } from '../../../components/Form/Select/ItemField';
import { NumberField } from '../../../components/Form/Input/NumberField';
import { SupplierField } from '../../../components/Form/Select/SupplierField';
import { CurrencyField } from '../../../components/Form/Input/CurrencyField';

const fields: FormFields<AddPurchase> = {
  invoice: {
    label: "Invoice",
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
  __items__: {
    label: "Barang",
    component: ItemField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Barang",
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
  debt: {
    label: "Hutang",
    component: CurrencyField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Hutang"
      }
    }
  },
  __supplier__: {
    label: "Supplier",
    component: SupplierField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Supplier"
      }
    }
  },
}

type Props = {
  handleForm: (data: AddPurchase) => void,
  purchase? : Purchase;
};

const PurchaseSchema = yup.object().shape({
  date: yup.string().required('Tanggal Tidak Boleh Kosong'),
  __items__: yup.array().required('Barang Tidak Boleh Kosong'),
  unit: yup.string().required('Satuan Tidak Boleh Kosong'),
  amount: yup.string().required('Jumlah Tidak Boleh Kosong'),
  total: yup.string().required('Total Tidak Boleh Kosong'),
  __supplier__: yup.object().required('Supplier Tidak Boleh Kosong'),
}) as unknown as yup.ObjectSchema<AddPurchase>;

const PurchaseForm = ({ handleForm, purchase }: Props) => {
  const { control } = useForm<AddPurchase>({
    fields,
    validations: PurchaseSchema,
    defaultValue: purchase,
  });
  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default PurchaseForm
