import React, { useEffect, useState } from 'react'
import SideBar from "./SideBar";
import Config from "../Config"

const UserAll = () => {
  const [user, setUser] = useState()

  useEffect(()=>{
    getUserAll();
  }, [])

  const getUserAll = async () => {
   const response = await Config.getUserAll()
   setUser(response.data) 
  }

  return (
    <div className="container bg-light">
    <div className="row">
      <SideBar/>
      <div className="col-sm-9 mt-3 mb-3">
        <div className="card">
          <div className="card-body">
            <table className='table'>
              <thead>
                <tr>
                <th>ORDER</th>
                <th>NAME</th>
                <th>ACCION</th>
                </tr>
              </thead>
            <tbody>
              {
                !users ? "....Loading" : users.map(
                  (user)=>{
                    return (
                      <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>
                        <Link to={`/admin/user/edit/${user.id}`} className="btn btn-primary">Editar</Link>
                      </td>
                    </tr>
                    )
                  }
                )};
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserAll
