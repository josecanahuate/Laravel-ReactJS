import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'

const LayoutAdmin = () => {
const {getRol} = AuthUser()
const navigate = useNavigate()

useEffect(()=>{
  if(getRol()!="admin"){
    navigate("/")
  }
}, []);

  return (
    <div>
    <h1>Page Home Admin</h1>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default LayoutAdmin
