import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddSupplier, Supplier } from 'services/supplier/types';
import Select, { MultiValue } from 'react-select'
import { getItems } from 'services/item';

type Props = {
  handleForm: (data: AddSupplier) => void,
  handleCloseForm: () => void,
  supplier? : Supplier;
};

const queryParams = {
  keywords: '',
  orderBy: 'brand',
  orderType: 'ASC',
  page: 1,
  limit: 1000,
}

const FormComp = ({handleForm, handleCloseForm, supplier}: Props) => {
  const { register, handleSubmit, setValue } = useForm<AddSupplier>({
    defaultValues: supplier,
  });
  const [isClearable, setIsClearable] = useState(true);

  const { data: itemsData } = getItems(queryParams);

  const itemsDefaultValues = supplier?.__items__?.map((item) => ({
    value: item.id,
    label: item.brand,
  }))

  const itemsOptions = 
  itemsData?.data.map((item) => ({
    value: item.id,
    label: item.brand,
  }));

  const handleItemsChange = (newValue: MultiValue<{ value: string; label: string; }>) => {
    const selectedValues = newValue?.map(option => {
      return {id: option.value, brand: option.label};
    });
    setValue('__items__', selectedValues);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div className="mb-3">
        <label className="form-label">
          Nama
        </label>
        <input
          type="text"
          className="form-control"
          {...register('name', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Alamat
        </label>
        <input
          type="text"
          className="form-control"
          {...register('address', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Kota
        </label>
        <input
          type="text"
          className="form-control"
          {...register('city', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Telepon
        </label>
        <input
          type="text"
          className="form-control"
          {...register('phone_number', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Rekening
        </label>
        <input
          type="text"
          className="form-control"
          {...register('account_number', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Rekening Atas Nama
        </label>
        <input
          type="text"
          className="form-control"
          {...register('account_owner', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Bank
        </label>
        <input
          type="text"
          className="form-control"
          {...register('bank', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Barang
        </label>
        <Select
          isMulti
          options={itemsOptions}
          defaultValue={itemsDefaultValues}
          isClearable={isClearable}
          onChange={handleItemsChange}
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