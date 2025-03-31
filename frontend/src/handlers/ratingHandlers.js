// Handler para valoración por estrellas

import axios from 'axios';
import { useState } from 'react';

export function useRatingHandlers() {
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(null);

  const handleStarRating = async (idResumen, puntuacion) => {
    try {
      await axios.post(`/api/resumenes/${idResumen}/rate`, {
        puntuacion,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setRating(puntuacion);
    } catch (err) {
      console.error(err);
      setError('Error al enviar la valoración');
    }
  };

  return { handleStarRating, rating, error };
}
