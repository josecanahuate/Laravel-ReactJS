import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const token = JSON.parse(tokenString);
        return token;
    };

    const getRol = () => {
        const rolString = sessionStorage.getItem('rol');
        const rol = JSON.parse(rolString);
        return rol;
    };

    const saveToken = (user, token, rol) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', JSON.stringify({ token: token }));
        sessionStorage.setItem('rol', JSON.stringify(rol));

        // Redireccionar según el rol
        if (rol === "admin") {
            navigate('/admin');
        } else if (rol === "client") {
            navigate('/client');
        }
    };

    const getLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return {
        setToken: saveToken,
        getToken: getToken, // Devuelve getToken como una función
        getRol: getRol, // Devuelve getRol como una función
        getLogout: getLogout
    };
};

export default AuthUser;
