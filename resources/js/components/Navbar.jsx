import React from 'react';
import AuthUser from '../pageauth/AuthUser';
import Config from '../Config'; // Importa Config

const Navbar = () => {
  const { getRol, getLogout, getToken } = AuthUser();

  const logoutUser = () => {
    // Usa Config.getLogout para realizar el logout
    Config.getLogout('/logout')
      .then(response => {
        getLogout();
      }).catch(error => {
        console.error(error);
      });
  };

  const renderLinks = () => {
    if (getToken()) {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href={`/${getRol()}`}>
              {getRol() === 'admin' ? 'Administración' : 'Cliente'}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            LARAVEL + REACT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/categorias">
                  Categorias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  BLANK
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">{renderLinks()}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
