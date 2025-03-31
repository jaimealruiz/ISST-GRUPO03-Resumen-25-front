// Handler para cancelar suscripción

import axios from 'axios';
import { useState } from 'react';

export function useSuscripcionHandlers() {
  const [error, setError] = useState(null);
  const [cancelado, setCancelado] = useState(false);

  const handleCancelarSuscripcion = async () => {
    try {
      await axios.delete('/api/suscripciones/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setCancelado(true);
    } catch (err) {
      console.error(err);
      setError('No se pudo cancelar la suscripción');
    }
  };

  return { handleCancelarSuscripcion, cancelado, error };
}
