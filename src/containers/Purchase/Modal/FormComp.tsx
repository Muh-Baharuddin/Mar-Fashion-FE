import React from 'react'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import { AddPurchase, Purchase } from 'services/purchase/types';
import AddComp from 'src/containers/Supplier/Table/Components/AddComp';
import TablePurchase from '../Table/TablePurchase';

type Props = {
  handleForm: (data: AddPurchase) => void,
  handleCloseForm: () => void,
  purchase? : Purchase;
};

const FormComp = ({handleForm, handleCloseForm, purchase}: Props) => {
  const { register, handleSubmit } = useForm<AddPurchase>({
    defaultValues: purchase,
  });

  return (
    <form onSubmit={handleSubmit(handleForm)}>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">
                Nomor Invoice
              </label>
              <input
                type="text"
                className="form-control"
                {...register('invoice', { required: true })}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">
                Tanggal
              </label>
              <input
                type="date"
                className="form-control"
                {...register('date', { required: true })}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">
                Supplier
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-control"
                  style={{ flexGrow: 1, marginRight: '8px' }}
                  {...register('supplier', { required: true })}
                />
                <AddComp />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <TablePurchase />
        <div className="mb-3">
          <label className="form-label">
            Satuan
          </label>
          <select className="form-control" {...register('unit', { required: true })}>
            <option value="">Pilih Satuan</option>
            <option value="PCS">PCS</option>
            <option value="LUSIN">LUSIN</option>
            <option value="KODI">KODI</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Total
          </label>
          <input
            type="text"
            className="form-control"
            {...register('cost', { required: true })}
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