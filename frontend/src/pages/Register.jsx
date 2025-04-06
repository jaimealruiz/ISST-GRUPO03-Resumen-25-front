// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../context/useAuth";
import "./Register.css"; // Importa tu hoja de estilos

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(email, password);
      setUser(user);
      navigate("/catalogo");
    } catch (err) {
      setError("No se pudo registrar. ¿Email ya registrado?");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registrarse</h2>

      {error && <p className="register-error">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          required
        />
        <button type="submit" className="register-button">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default Register;
