import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthUser from './AuthUser'

const ProtectedRoutes = () => {
  //sino existe un token el login sera dirigido al login
  const {getToken} = AuthUser()
  if(!getToken()){
    return <Navigate to={"/login" }/>
  } 

  return (
    <div>
      <div>PROTEGIDO</div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoutes
