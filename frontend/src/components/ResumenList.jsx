// src/components/ResumenList.jsx
import React from "react";
import { Link } from "react-router-dom";
import ResumenCard from "./ResumenCard";
import "./ResumenList.css";

function ResumenList({ resumenes }) {
  return (
    <div className="resumen-list-container">
      {resumenes.map((resumen) => (
        <Link
          key={resumen.id}
          to={`/resumen/${resumen.id}`}
          className="resumen-list-item-link"
          style={{ textDecoration: "none" }}
        >
          <ResumenCard resumen={resumen} />
        </Link>
      ))}
    </div>
  );
}

export default ResumenList;
