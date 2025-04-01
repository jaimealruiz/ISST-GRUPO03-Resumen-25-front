import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();


  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Resumen.es</h1>
        <div className="button-group">
          <button className="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="button" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Libros */}
        <div className="books-container">
          {["habitosatomicos", "cheese", "nuncatepares"].map(
            (img) => (
              <img
                key={img}
                src={`assets/images/${img}.jpg`}
                className="book-image"
                alt={`Libro ${img}`}
              />
            )
          )}
        </div>

        

        {/* Descripción */}
        <div className="description">
          <h2>¿No tienes tiempo para leer libros enteros?</h2>
          <p>Aprovecha cada minuto con resúmenes claros, directos y prácticos</p>
          <ul className="feature-list">
            <li>Lo mejor de los libros en minutos</li>
            <li>Aprende sin perder tiempo</li>
            <li>Decide si un libro vale la pena antes de comprarlo</li>
          </ul>
        </div>
      </div>

      {/* Botón de catálogo */}
      <button className="catalog-button" onClick={() => navigate("/catalog")}>
        <span>🔍</span>
        Catálogo
      </button>
    </div>
  );
};

export default Home;