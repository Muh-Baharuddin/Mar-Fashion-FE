import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MarFashionContext } from 'src/context/MarFashionProvider';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Data {
  id: string;
  merek: string;
  size: string;
  warna: string;
  stok: number;
  harga: number;
}

type handleShowType = {
  showAdd: boolean;
  showEdit: boolean;
  handleShowAdd: () => void;
  handleShowEdit: () => void;
}

const TableComp = (props: handleShowType) => {
  const { isLogin } = React.useContext(MarFashionContext);
  const { handleShowAdd, handleShowEdit } = props
  const [data, setData] = React.useState<Data[]>([]);

  const handleDelete = (id: string) => {
    axios.delete('http://localhost:4000/barang/' + id).then(response => {
      console.log("ini nilai respon", response )
      alert(response.data.message)
      window.location.reload()
    })
  }

  React.useEffect(() => {
    axios.get('http://localhost:4000/barang').then(response => {
      setData(response.data)
    });
  },[])

  return (
    <div className="card">
    <div className="card-header">
      {!isLogin && <button  onClick={handleShowAdd} className="btn btn-primary">
        <i className="bi bi-plus-square"></i>
      </button> }
      
    </div>
    <div className="card-body">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Merek</th>
            <th>Size</th>
            <th>Warna</th>
            <th>Stok</th>
            <th>Harga</th>
            {!isLogin && <th>Action</th> }
          </tr>
        </thead>
        <tbody>
          {data && Object.values(data).map((d, index) => {
            return (
              <tr key={d.id}>
                <td>{++index}</td>
                <td>{d.merek.slice(0, 150)}</td>
                <td>{d.size}</td>
                <td>{d.warna}</td>
                <td>{d.stok}</td>
                <td>
                    {d.harga}
                </td>
                {!isLogin && <td> 
                  <button onClick={handleShowEdit} className="btn btn-primary ms-3">
                    <i className="bi bi-pencil-square"></i>  
                  </button>
                  <button onClick={() => handleDelete(d.id)} className="btn btn-danger ms-3">
                    <i className="bi bi-trash3-fill"></i>  
                  </button>
                </td> }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default TableComp;