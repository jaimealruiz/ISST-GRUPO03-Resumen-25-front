import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido {user.nombre}</h1>
      <p>Rol: {user.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};