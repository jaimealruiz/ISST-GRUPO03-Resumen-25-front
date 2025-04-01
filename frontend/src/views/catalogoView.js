// Catalogo.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Catalogo.css';

function Catalogo() {
  const [resumenes, setResumenes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumenes = async () => {
      try {
        const res = await axios.get('/api/resumenes');
        setResumenes(res.data);
      } catch (err) {
        console.error('Error al cargar el catálogo:', err);
      }
    };
    fetchResumenes();
  }, []);

  const handleResumenClick = (resumen) => {
    if (resumen.isFree || isAuthenticated) {
      navigate(`/resumen/${resumen.idResumen}`);
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className="catalogo-container">
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="volver">←</button>
        <div>
          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate('/login')} className="btn">Login</button>
              <button onClick={() => navigate('/sign-in')} className="btn">Sign up</button>
            </>
          ) : (
            <button onClick={() => navigate('/menu')} className="btn">☰</button>
          )}
        </div>
      </div>
      <h1 className="catalogo-title">🔍 Catálogo</h1>
      <div className="catalogo-grid">
        {resumenes.map((resumen) => (
          <div
            key={resumen.idResumen}
            className="resumen-card"
            onClick={() => handleResumenClick(resumen)}
          >
            <img
              src={`/portadas/${resumen.idResumen}.jpg`}
              alt={resumen.titulo}
              className="resumen-img"
            />
            {!resumen.isFree && (
              <span className="lock-icon">🔒</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
