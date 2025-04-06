// ResumenList.jsx
import React from "react";
import ResumenCard from "./ResumenCard";
import "./ResumenList.css"; // Importa tu nueva hoja de estilo

function ResumenList({ resumenes }) {
  return (
    <div className="resumen-list-container">
      {resumenes.map((resumen) => (
        <ResumenCard key={resumen.id} resumen={resumen} />
      ))}
    </div>
  );
}

export default ResumenList;
