// SubirResumen.jsx
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../api/document";
import "./SubirResumen.css"; // Importar los estilos

function SubirResumen() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.writer) {
      setMsg("No tienes permisos para subir resúmenes.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isFree", isFree);
    formData.append("file", file);

    try {
      await uploadDocument(formData);
      setMsg("Resumen subido correctamente ✅");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMsg("Error al subir el resumen ❌");
    }
  };

  return (
    <div className="subir-container">
      <h2 className="subir-title">Subir resumen</h2>

      {msg && <p className="subir-msg">{msg}</p>}

      <form onSubmit={handleSubmit} className="subir-form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="subir-input"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="subir-textarea"
        />
        <div className="subir-checkbox-container">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
          />
          <label>Disponible gratuitamente</label>
        </div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          accept=".pdf"
          className="subir-file"
        />
        <button type="submit" className="subir-button">
          Subir resumen
        </button>
      </form>
    </div>
  );
}

export default SubirResumen;
