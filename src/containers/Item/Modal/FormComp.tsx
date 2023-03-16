import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { getCategorys } from 'services/category';
import { AddItem, Item } from 'services/item/types';
import { CSSProperties } from 'react'
import BeatLoader from "react-spinners/BeatLoader";

type Props = {
  handleForm: (data: AddItem) => void,
  handleCloseForm: () => void,
  item? : Item;
};

const FormComp = ({ handleForm, handleCloseForm, item }: Props) => {
  const { register, handleSubmit } = useForm<AddItem>({
    defaultValues: item,
  });

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const { data, isLoading } = getCategorys();
  console.log("ini data dari A",data),

  React.useEffect(() => {
    console.log("ini data dari B",data?.data)
  }, []);

  return (
    <form onSubmit={handleSubmit(handleForm)}>
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
              <option key={category.id} value={category.id}>
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