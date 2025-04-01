import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/axios_helper';
import './Login.css';
//import users from '../userdata/usuario.json'; // Importar el JSON

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const history = useHistory();


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = e => {
    e.preventDefault();
    API.post('/login', formData)
      .then(response => {
        // Suponiendo que la respuesta incluye token y datos de usuario
        login(response.data.token, response.data.user);
        history.push('/dashboard');
      })
      .catch(error => {
        console.error(error);
        // Muestra un error al usuario
      });
  };

  return (
    <div className="login-container">
      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Volver
      </button>
      <div className="form-group">
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        name="email" 
        value={formData.email}
        onChange={handleChange} 
        placeholder="Email" required
      />
      <input
        type="password"
        name="password" 
        value={formData.password}
        onChange={handleChange} 
        placeholder="Password" required
      />
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
    </div>
    
      
</div>
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
