import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthUser = () => {
    //logica para saber si el usuario esta logeado o NO.
    const navigate = useNavigate();

    const getToken =()=>{
        const tokenString = sessionStorage.getItem('token');
         // Devolvemos el token
         const token = JSON.parse(tokenString)
         return token;
    }

    const getUser =()=>{
        const userString = sessionStorage.getItem('user');
         // Devolvemos el token
         const user = JSON.parse(userString)
         return user;
    }

    const getRol =()=>{
        const rolString = sessionStorage.getItem('rol');
         // Devolvemos el token
         const rol = JSON.parse(rolString)
         return rol;
    }

    //usamos usestate para poder almacenar y gestionar este informacion
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [rol, setRol] = useState(getRol());

    const saveToken=(user, token, rol) => {
        sessionStorage.setItem('user',JSON.stringify(user));
        sessionStorage.setItem('token',JSON.stringify({token:token}));
        sessionStorage.setItem('rol',JSON.stringify(rol));
        
        setUser(user);
        setToken(token);
        setRol(rol);


        //rol::admin | client
        //al ser autenticado se redirigira a su pantalla correspondiente
        if(getRol()==="admin")
            navigate('/admin')
        if(getRol()==="client")
            navigate('/client')
    }

    const getLogout = () =>{
        sessionStorage.clear()
        navigate('/')
    }

  return {
    setToken:saveToken, 
    token,
    user,
    rol,
    getToken, getRol, getUser, getLogout
  }

}

export default AuthUser


