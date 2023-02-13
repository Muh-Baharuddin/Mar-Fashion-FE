import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCookies } from 'react-cookie'
import DataTable from 'react-data-table-component'

interface Data {
  id: string
  userName: string
  role: string
}

const TableAkun = () => {
  const [cookies] = useCookies(['token', 'user'])
  const [data, setData] = useState<Data[]>([])

  let token = cookies.token
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  useEffect(() => {
    axios.get('http://localhost:4000/user', config).then((response) => {
      setData(response.data)
    })
  }, [])

  return (
    <div className="card">
      <div className="card-header">
        {cookies.user && (
          <Link href={'/register'}>
            <button className="btn btn-primary">
              <i className="bi bi-plus-square"></i>
            </button>
          </Link>
        )}
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Role</th>
              {cookies.user && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.values(data).map((d, index) => {
                return (
                  <tr key={d.id}>
                    <td>{++index}</td>
                    <td>{d.userName}</td>
                    <td>{d.role}</td>
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

export default TableAkun
