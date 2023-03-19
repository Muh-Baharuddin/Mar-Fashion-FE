import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { getCategorys } from 'services/category';
import { AddItem, Item, RawData } from 'services/item/types';
import { getSuppliers } from 'services/supplier';

type Props = {
  handleForm: (data: AddItem) => void,
  handleCloseForm: () => void,
  item? : Item;
};

const queryParams = {
  keywords: '',
  orderBy: 'name',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const FormComp = ({ handleForm, handleCloseForm, item }: Props) => {
  const { data: categoryData } = getCategorys(queryParams);
  const { data: supplierData, isLoading: isSupplierLoading } = getSuppliers(queryParams);
  
  const itemToRawData = (item: Item): RawData => {
    const categories = item.categories?.map((category) => category.id || '') || [];
    return {
      brand: item.brand,
      capital_price: item.capital_price,
      wholescale_price: item.wholescale_price,
      stock: item.stock,
      categories,
    };
  };

  const defaultValues = item ? itemToRawData(item) : {};

  const { register, handleSubmit } = useForm<RawData>({
    defaultValues,
  });

  const handleDataForm = (data: RawData) => {
    const categories = data.categories?.map((category) => (JSON.parse(category)));
    const newData = {...data, categories: categories};
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
          {...register('categories', { required: true })}
        >
          {categoryData?
            categoryData.data.map((category) => (
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
      <div className="mb-3">
        <label className="form-label">
          Supplier
        </label>
        <select
          className="form-select"
          {...register('__supplier__')}
        >
          {isSupplierLoading ? (
            <option>Loading...</option>
          ) : (
            supplierData?.data.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))
          )}
        </select>
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