import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ResumenDetalle() {
  const { id } = useParams();
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/documents/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el resumen");
        return res.json();
      })
      .then((data) => setResumen(data))
      .catch((err) => console.error("Error al cargar resumen:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando resumen...</p>;
  if (!resumen) return <p className="text-center mt-10 text-red-500">Resumen no encontrado</p>;

  // URL del PDF servida por el backend
  const pdfUrl = `http://localhost:8080/api/documents/download/${id}`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumen.title}</h1>
      <p className="text-gray-600 mb-6">{resumen.description}</p>

      {/* Visor de PDF con iframe */}
      <div className="bg-gray-100 p-4 rounded shadow overflow-hidden h-[80vh]">
        <iframe
          src={pdfUrl}
          title="Resumen PDF"
          width="100%"
          height="100%"
          className="rounded"
        ></iframe>
      </div>

      {/* Valoración (placeholder) */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium mb-2">¿Qué te ha parecido?</p>
        <div className="flex justify-center gap-4 text-3xl">
          <button className="hover:scale-110 transition">👍</button>
          <button className="hover:scale-110 transition">👎</button>
        </div>
      </div>
    </div>
  );
}

export default ResumenDetalle;
