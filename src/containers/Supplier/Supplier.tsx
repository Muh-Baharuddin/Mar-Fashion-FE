import axios from 'axios'
import { useState } from 'react'
import { QueryParamsType } from 'src/@types/user'
import AddComp from './Table/Components/AddComp'
import TableSupplier from './Table/TableSupplier'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Supplier {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

export interface Data {
  data: Supplier[],
  total: number;
}

export const DataSupplier = () => {
  const [data, setData] = useState<Data>({
    data: [],
    total: 0,
  });

  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    keywords: '',
    orderBy: 'nama',
    orderType: '',
    page: 1,
    limit: 10,
  })

  const refreshSupplier = () => {
    const url = `${process.env.API_ENDPOINT}supplier`;
    axios.get<Data>(url, {
      params: queryParams
    }).then((response) => {
      setData(response.data);
    }).catch(() => {
      toast.error("Maaf terjadi kesalahan pada server. Mohon coba kembali dalam beberapa saat.");
    })
  };

  return (
    <div className="container">
      <h3>Data Supplier</h3>
      <div className="card">
        <div className="card-header">
          <AddComp refreshSupplier={refreshSupplier}/>
        </div>
        <TableSupplier 
          data={data}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          refreshSupplier={refreshSupplier}
        />
      </div>
    </div>
  )
}
