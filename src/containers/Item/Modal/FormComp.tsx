import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { getCategorys } from 'services/category';
import { AddItem, Item } from 'services/item/types';

type Props = {
  handleForm: (data: AddItem) => void,
  handleCloseForm: () => void,
  item? : Item;
};

export interface RawData {
  brand: string
  capital_price: number;
  wholescale_price: number;
  stock: number;
  __supplier__?: {
    name: string;
  };
  __categories__: string[];
}

const FormComp = ({ handleForm, handleCloseForm, item }: Props) => {
  const itemToRawData = (item: Item): RawData => {
    const categories = item.__categories__?.map((category) => category.id || '') || [];
    return {
      brand: item.brand,
      capital_price: item.capital_price,
      wholescale_price: item.wholescale_price,
      stock: item.stock,
      __categories__: categories,
    };
  };

  const defaultValues = item ? itemToRawData(item) : {};

  const { register, handleSubmit } = useForm<RawData>({
    defaultValues,
  });

  const { data } = getCategorys();

  const handleDataForm = (data: RawData) => {
    const categories = data.__categories__?.map((category) => (JSON.parse(category)));
    const newData = {...data, __categories__: categories};
    handleForm(newData);
  };

  return (
    <form onSubmit={handleSubmit(handleDataForm)}>
      <div className="mb-3">
        <label className="form-label">
          Merek
        </label>
        <input
          type="text"
          className="form-control"
          {...register('brand', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Kategori
        </label>
        <select
          className="form-select"
          multiple
          {...register('__categories__', { required: true })}
        >
          {data?
            data.data.map((category) => (
              <option key={category.id} value={JSON.stringify({id: category.id, name: category.name})}>
                {category.name}
              </option>
            )) : <option>Loading...</option>
          }
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Harga Modal
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          {...register('capital_price', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Harga Grosir
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          {...register('wholescale_price', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Stok
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          {...register('stock', { required: true })}
        />
      </div>
      <Button variant="primary" onClick={() => handleForm} type="submit">
        Submit
      </Button>
      <Button className='mx-2' variant="secondary" onClick={handleCloseForm}>
        Close
      </Button>
    </form>
  )
}

export default FormComp