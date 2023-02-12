import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCookies } from 'react-cookie'
import DataTable from 'react-data-table-component'

interface Data {
  id: string
  barang: string
  tanggal: string
  jumlah: number
  harga: number
  keterangan: string
}

type handleShowType = {
  showAdd: boolean
  showEdit: boolean
  setShowAdd: Dispatch<SetStateAction<boolean>>
  setShowEdit: Dispatch<SetStateAction<boolean>>
}

const TableRetur = (props: handleShowType) => {
  const { showAdd, showEdit, setShowAdd, setShowEdit } = props
  const [cookies] = useCookies(['token', 'user'])
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    axios.get('http://localhost:4000/retur', config).then((response) => {
      setData(response.data)
    })
  }, [])

  let token = cookies.token
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  return (
    <div className="card">
      <div className="card-header">
        {cookies.user && (
          <button className="btn btn-primary">
            <i className="bi bi-plus-square"></i>
          </button>
        )}
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Barang</th>
              <th>Tanggal</th>
              <th>Jumlah Barang Retur</th>
              <th>Harga</th>
              <th>Keterangan</th>
              {cookies.user && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.values(data).map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>{++index}</td>
                    <td>{d.barang}</td>
                    <td>{d.tanggal}</td>
                    <td>{d.jumlah}</td>
                    <td>{d.harga}</td>
                    <td>{d.keterangan}</td>
                    {cookies.user && (
                      <td>
                        <button
                          className="btn btn-primary ms-3"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-danger ms-3"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableRetur
