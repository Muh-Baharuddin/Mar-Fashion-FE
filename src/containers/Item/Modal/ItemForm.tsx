import React from 'react'
import * as yup from 'yup';
import { AddItem, Item } from 'services/item/types';
import { DynamicForm, FormFields, useForm } from '../../../components/DynamicForm';
import { TextField } from '../../../components/Form/TextField';
import { NumberField } from '../../../components/Form/NumberField';
import { CategoryField } from '../../../components/Form/CategoryField';
import { SupplierField } from '../../../components/Form/SupplierField';
import { CurrencyField } from '../../../components/Form/CurrencyField';

const fields: FormFields<AddItem> = {
  brand: {
    label: "Merek",
    component: TextField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Merek",
      }
    }
  },
  __categories__: {
    label: "Kategori",
    component: CategoryField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Kategori",
      }
    }
  },
  capital_price: {
    label: "Harga Modal",
    component: CurrencyField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Harga Modal",
      }
    }
  },
  wholescale_price: {
    label: "Harga Grosir",
    component: CurrencyField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Harga Grosir",
      }
    }
  },
  stock: {
    label: "Stok",
    component: NumberField,
    props: (props) => {
      return {
        ...props,
        placeholder: "Stok",
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
  handleForm: (data: AddItem) => void,
  item? : Item;
};

const itemSchema = yup.object().shape({
  brand: yup.string().required('Merek Tidak Boleh Kosong'),
  capital_price: yup.string().required('Harga Modal Tidak Boleh Kosong'),
  wholescale_price: yup.string().required('Harga Grosir Tidak Boleh Kosong'),
  stock: yup.string().required('Stok Tidak Boleh Kosong'),
  __categories__: yup.array().required('Kategori Tidak Boleh Kosong'),
  __supplier__: yup.object().required('Supplier Tidak Boleh Kosong'),
}) as unknown as yup.ObjectSchema<AddItem>;

const ItemForm = ({ handleForm, item }: Props) => {
  const { control } = useForm<AddItem>({
    fields,
    validations: itemSchema,
    defaultValue: item,
  });
  return (
    <DynamicForm
      control={control}
      onSubmit={handleForm}
    />
  )
}

export default ItemForm
