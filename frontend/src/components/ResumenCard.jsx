// src/components/ResumenCard.jsx
import React from 'react';
import './ResumenCard.css';

function ResumenCard({ resumen }) {
  const imgSrc = `https://picsum.photos/seed/${resumen.id}/300/400`;

  return (
    <div className="resumen-card">
      <img src={imgSrc} alt={resumen.title} />
      <div className="resumen-card-content">
        <h2 className="resumen-title">{resumen.title}</h2>
        <p className="resumen-description">{resumen.description}</p>
      </div>
    </div>
  );
}

export default ResumenCard;
