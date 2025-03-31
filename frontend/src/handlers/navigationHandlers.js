import { useNavigate } from 'react-router-dom';

export function useNavigationHandlers(isAuthenticated) {
  const navigate = useNavigate();

  const handleResumenGratisClick = (idResumen) => {
    navigate(`/resumen/${idResumen}`);
  };

  const handleCatalogoClick = () => {
    if (isAuthenticated) {
      navigate('/catalogo');
    } else {
      navigate('/sign-in');
    }
  };

  return { handleResumenGratisClick, handleCatalogoClick };
}
