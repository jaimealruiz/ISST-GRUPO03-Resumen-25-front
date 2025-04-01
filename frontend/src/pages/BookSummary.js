import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookSummary.css';

const BookSummary = () => {
  const navigate = useNavigate();
  const { state: book } = useLocation();

  return (
    <div className="summary-container">
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      <div className="book-header">
        <img 
          src={book.image} 
          alt={book.title} 
          className="book-cover-large"
        />
        <div className="book-meta">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <div className="rating">
            ★ {book.rating}
          </div>
        </div>
      </div>

      <div className="summary-content">
        <h3>Resumen completo</h3>
        <p>{book.fullSummary}</p>
        
        <div className="key-points">
          <h4>Puntos clave:</h4>
          <ul>
            {book.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <button 
          className="read-button"
          onClick={() => navigate('/lector')}
        >
          📖 Leer ahora
        </button>
      </div>
    </div>
  );
};

export default BookSummary;