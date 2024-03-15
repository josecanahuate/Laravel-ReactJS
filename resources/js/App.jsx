import React from 'react';
/* import ReactDOM from 'react-dom';*/
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

import LayoutPublic from './layouts/LayoutPublic';
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutClient from './layouts/LayoutClient';

import PageHome from './pagepublic/PageHome';
import ProtectedRoutes from './pageauth/ProtectedRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//AUTH
import Login from './pageauth/Login';
import Register from './pageauth/Register';
import Panel from './pageadmin/PanelAdmin';
import PanelAdmin from './pageadmin/PanelAdmin';
import PanelClient from './pageclient/PanelClient';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<PageHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes />}>
          {/* Rutas para el área de administrador */}
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<PanelAdmin />} />
          </Route>


        {/* Rutas para clientes */}
        <Route path="/client" element={<LayoutClient />}>
          <Route index element={<PanelClient />} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

if (document.getElementById('root')) {
  const Index = ReactDOM.createRoot(document.getElementById('root'));

  Index.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
