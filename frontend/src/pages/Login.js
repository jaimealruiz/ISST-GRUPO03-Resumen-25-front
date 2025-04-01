import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import users from '../userdata/usuario.json'; // Importar el JSON

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  /* const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log('Email:', email, 'Password:', password);
    // Redirección temporal
    navigate('/');
  }; */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Buscar coincidencia en el JSON
    const foundUser = users.find(user =>
      user.email === email &&
      user.password === password
    );

    if (foundUser) {
      if (!foundUser.activo) {
        alert('Cuenta desactivada');
        return;
      }
      login(foundUser); // Guardar en estado global
      navigate('/dashboard'); // Redirigir
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="usuario@ejemplo.com"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="123456"
      />
      <button type="submit">Entrar</button>
    </form>

    /* <div className="login-container">

      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Volver
      </button>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Sign In</button>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>

        <div className="signup-redirect">
          <p>¿Aún no tienes cuenta?
            <span
              className="signup-link"
              onClick={() => navigate('/signup')}
            >
              Regístrate aquí
            </span>
          </p>
        </div>

      </form>
    </div> */

    
  );
};

export default Login;
