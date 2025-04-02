// Catalogo.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getAllDocuments } from "../api/document";
import ResumenList from "../components/ResumenList";
import Loader from "../components/Loader";
import "./Catalogo.css"; // Importar la hoja de estilos

function Catalogo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumenes, setResumenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    getAllDocuments()
      .then(setResumenes)
      .catch((err) => console.error("Error al obtener catálogo completo:", err))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  return (
    <div className="catalogo-container">
      <h1 className="catalogo-title">Catálogo completo</h1>
      {loading ? (
        <Loader />
      ) : resumenes.length > 0 ? (
        <ResumenList resumenes={resumenes} />
      ) : (
        <p className="no-resumenes-message">
          No hay resúmenes disponibles.
        </p>
      )}
    </div>
  );
}

export default Catalogo;
