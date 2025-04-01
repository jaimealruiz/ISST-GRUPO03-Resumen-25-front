import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    usuario: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar contraseñas
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica de registro
    console.log('Datos de registro:', formData);
    navigate('/');
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Registro de usuario</h1>
        
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirmar contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmarContraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div className="show-password">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Mostrar contraseña
          </label>
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default SignUp;