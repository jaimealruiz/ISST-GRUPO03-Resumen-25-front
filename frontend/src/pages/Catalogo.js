import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import API from './api';

const Catalogo = () => {
  const { auth } = useContext(AuthContext);
  const [resumenes, setResumenes] = useState([]);

  useEffect(() => {
    API.get('/resumenes')
      .then(response => {
        // Suponiendo que response.data sea el array de resumenes
        if (!auth.isAuthenticated) {
          setResumenes(response.data.slice(0, 3));
        } else {
          setResumenes(response.data);
        }
      })
      .catch(error => console.error(error));
  }, [auth.isAuthenticated]);

  return (
    <div>
      {resumenes.map(item => (
        <div key={item.id}>
          <img src={item.portadaUrl} alt={item.titulo} />
          <h3>{item.titulo}</h3>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
