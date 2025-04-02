// ResumenCard.jsx
 {/*
import React from 'react';
import { Link } from "react-router-dom";
import './ResumenCard.css'; // Importa tu hoja de estilo

function ResumenCard({ resumen }) {
  const imgSrc = `https://picsum.photos/seed/${resumen.id}/300/400`;

  return (
    <div className="resumen-card">
      <img src={imgSrc} alt={resumen.title} />
      <div className="resumen-card-content">
        <div>
          <h2 className="resumen-title">{resumen.title}</h2>
          <p className="resumen-description">{resumen.description}</p>
        </div>
       
        
        <Link
          to={`/resumen/${resumen.id}`}
          className="resumen-link"
        >
          Ver PDF
        </Link>
        
      </div>
    </div>
  );
}

export default ResumenCard;
*/}










// ResumenCard.jsx
import React from 'react';
import './ResumenCard.css'; // Importa tu hoja de estilo

function ResumenCard({ resumen }) {
  const imgSrc = `https://picsum.photos/seed/${resumen.id}/300/400`;
  const pdfUrl = `http://localhost:8080/api/documents/download/${resumen.id}`;

  const handleOpenPDF = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="resumen-card">
      <img src={imgSrc} alt={resumen.title} />
      <div className="resumen-card-content">
        <div>
          <h2 className="resumen-title">{resumen.title}</h2>
          <p className="resumen-description">{resumen.description}</p>
        </div>
        <button
          onClick={handleOpenPDF}
          className="resumen-link"
        >
          Ver PDF
        </button>
      </div>
    </div>
  );
}

export default ResumenCard;

