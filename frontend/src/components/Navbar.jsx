// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../api/auth";
import { useAuth } from '../context/useAuth';
import './Navbar.css'; 

import logo from '../assets/logo.jpg'



const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Sección izquierda: Logo o nombre de la app */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" style={{ height: '30px' }} />
        </Link>
      </div>

      {/* Sección derecha: links */}
      <div className="navbar-right">


        {user ? (
          <>
            <Link to="/catalogo" className="navbar-link">Catálogo</Link>
            {user.writer ? (<Link to="/escritor/subir" className="navbar-link">Subir Resumen</Link>) : null}
            <button onClick={handleLogout} className="navbar-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
