// Handler para subir resumen

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function useResumenHandlers() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResumenSubmit = async ({ titulo, audioFile, pdfFile }) => {
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('audio', audioFile);
      formData.append('pdf', pdfFile);

      await axios.post('/api/resumenes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSuccess(true);
      navigate('/catalogo');
    } catch (err) {
      console.error(err);
      setError('Error al subir el resumen');
    }
  };

  return { handleResumenSubmit, error, success };
}
