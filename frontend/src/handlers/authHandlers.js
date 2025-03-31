import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function useAuthHandlers(setUser) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser(user);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas');
    }
  };

  const handleSignInSubmit = async (formData) => {
    try {
      await axios.post('/api/auth/register', formData);
      await axios.post('/api/suscripciones', {
        email: formData.email,
        tarjeta: formData.tarjeta,
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Error en el registro');
    }
  };

  return { handleLoginSubmit, handleSignInSubmit, error };
}
