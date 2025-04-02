// Dashboard.js
import React, { useContext } from 'react';
import { useAuth} from '../context/AuthContext';

const Dashboard = () => {
  const { auth, logout } = useContext(useAuth);

  return (
    <div>
      <h1>Bienvenido, {auth.user ? auth.user.nombre : 'Usuario'}</h1>
      <button onClick={logout}>Cerrar sesión</button>
      {/* Aquí puedes incluir más componentes o secciones propias del dashboard */}
    </div>
  );
};

export default Dashboard;
