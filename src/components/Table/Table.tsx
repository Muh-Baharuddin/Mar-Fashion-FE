import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MarFashionContext } from 'src/context/MarFashionProvider';

interface Data {
  id: string;
  merek: string;
  size: string;
  warna: string;
  stok: number;
  harga: number;
}

const TableComp: React.FC = () => {
  const { isLogin } = React.useContext(MarFashionContext);
  const [data, setData] = React.useState<Data[]>([]);
  // const [products, setProducts] = React.useState();
  // const getProducts =  () => {
  //     axios.get('https://fajartimur.com/api/items/').then(response => {
  //       setData(response.data)
  //     });
  //     // setProducts(res.data.results)
  // }

  React.useEffect(() => {
    axios.get('http://localhost:4000/barang').then(response => {
      setData(response.data)
    });
  },[])

  return (
    <div className="card">
    <div className="card-header">
      {!isLogin && <button className="btn btn-primary">
        Tambah
      </button> }
      
    </div>
    <div className="card-body">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Merk</th>
            <th>Size</th>
            <th>Warna</th>
            <th>Stok</th>
            <th>Harga</th>
            {!isLogin && <th>Action</th> }
          </tr>
        </thead>
        <tbody>
          {data && Object.values(data).map((d) => {
            return (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.merek.slice(0, 150)}</td>
                <td>{d.size}</td>
                <td>{d.warna}</td>
                <td>{d.stok}</td>
                <td>
                    {d.harga}
                </td>
                {!isLogin && <td> 
                  <Link href={`/edit/${d.id}`} className="btn btn-primary" legacyBehavior>
                    <a >Edit</a>
                  </Link>
                  <button className="btn btn-danger ms-3">Delete</button>
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