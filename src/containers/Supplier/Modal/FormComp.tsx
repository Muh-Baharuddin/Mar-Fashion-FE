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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddSupplier>({
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
          placeholder="Nama Supplier"
          aria-invalid={errors.name ? "true" : "false"}
          {...register('name', { required: true })}
        />
        {errors.name && errors.name.type === "required" && (
          <span role="alert" style={{color:'red'}}>Nama Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Alamat
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Alamat Supplier"
          {...register('address', { required: true })}
        />
        {errors.address && errors.address.type === "required" && (
          <span role="alert" style={{color:'red'}}>Alamat Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Kota
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Kota Supplier"
          {...register('city', { required: true })}
        />
        {errors.city && errors.city.type === "required" && (
          <span role="alert" style={{color:'red'}}>Kota Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Telepon
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nomor Telepon Supplier"
          {...register('phone_number', { required: true, minLength: 10})}
        />
        {errors.phone_number && errors.phone_number.type === "required" && (
          <span role="alert" style={{color:'red'}}>Nomor Telepon Tidak Boleh Kosong</span>
        )}
        {errors.phone_number && errors.phone_number.type === "minLength" && (
          <span role="alert" style={{color:'red'}}>Nomor Telepon Minimal 10 Digit</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Nomor Rekening
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Nomor Rekening Supplier"
          {...register('account_number', { required: true, minLength: 10 })}
        />
        {errors.account_number && errors.account_number.type === "required" && (
          <span role="alert" style={{color:'red'}}>Nomor Rekening Tidak Boleh Kosong</span>
        )}
        {errors.account_number && errors.account_number.type === "minLength" && (
          <span role="alert" style={{color:'red'}}>Nomor Rekening Minimal 10 Digit</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Rekening Atas Nama
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Rekening Atas Nama Supplier"
          {...register('account_owner', { required: true })}
        />
        {errors.account_owner && errors.account_owner.type === "required" && (
          <span role="alert" style={{color:'red'}}>Nama Pemilik Rekening Tidak Boleh Kosong</span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">
          Bank
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Contoh: Mandiri"
          {...register('bank', { required: true })}
        />
        {errors.bank && errors.bank.type === "required" && (
          <span role="alert" style={{color:'red'}}>Bank Tidak Boleh Kosong</span>
        )}
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