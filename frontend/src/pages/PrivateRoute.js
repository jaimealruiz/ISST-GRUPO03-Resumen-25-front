import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  
  // Si no hay usuario, redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra la ruta protegida
  return <Outlet />;
};

export default PrivateRoute;