import React, { useContext, useEffect, useState } from 'react';
import { useAuth} from '../context/AuthContext';
import API from '../helpers/axios_helper';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const Catalogo = () => {
  const { user } = useAuth();
    const [resumenes, setResumenes] = useState([]);

  useEffect(() => {
    API.get('/userdata/lista-resumen.json')
    .then((response) => {
      // Se asume que la respuesta tiene la propiedad "resumenes"
      setResumenes(response.data.resumenes);
    })
    .catch((error) => console.error('Error al cargar los resúmenes:', error));
}, []);

const resGratuitos = ["Who Moved My Cheese?", "Nunca te pares", "Hábitos Atómicos"];

const displayedResumenes = user
? resumenes
: resumenes.filter((resumen) => resGratuitos.includes(resumen.titulo));

return (
  <div className="catalog-container">
    <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Volver
      </button>
    <h1>Catálogo</h1>
    <div className="books-grid">
      {displayedResumenes.map((resumen) => (
        <div key={resumen.id} className="book-item">
          <h3>{resumen.titulo}</h3>
          <p>{resumen.autor.email}</p>
          <a 
            href={resumen.archivoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ver-resumen"
          >
            Ver resumen
          </a>
        </div>
      ))}
    </div>
  </div>
);
};

export default Catalogo;