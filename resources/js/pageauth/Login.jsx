import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

const Login = () => {
  const { setToken, getToken, getLogout } = AuthUser();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      const rol = getToken().rol;
      if (rol === "admin") {
        navigate("/admin");
      } else if (rol === "client") {
        navigate("/client");
      }
    }
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie');
      const { data } = await Config.getLogin({ email, password });
      if (data.success) {
        setToken(data.user, data.token, data.role);
        const rol = data.role;
        if (rol === "admin") {
          navigate("/admin");
        } else if (rol === "client") {
          navigate("/client");
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await Config.getLogout('/logout');
      getLogout();
      navigate("/"); // Redirigir a la página principal después de cerrar sesión
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <div className="card mt-5 mb-5">
              <div className="card-body">
                <h1 className="text-center fw-bolder">
                  Login
                </h1>
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Email: "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password: "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button onClick={submitLogin} className='btn btn-primary w-100 mt-3'>ENVIAR</button>
                <p className='text-center mt-3'>{message}</p>
                <hr />
                <p className='text-center'>¿No tienes cuenta? <a href="/register" className='w-100 mt-3'>Registrate</a></p>
                <button onClick={handleLogout} className='btn btn-danger w-100 mt-3'>Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
