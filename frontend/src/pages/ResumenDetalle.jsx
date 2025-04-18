import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumenDetalle() {
  const { id } = useParams();
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);

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

  const pdfUrl = `http://localhost:8080/api/documents/download/${id}`;

  if (loading) return <p className="text-center mt-10">Cargando resumen...</p>;
  if (!resumen) return <p className="text-center mt-10 text-red-500">Resumen no encontrado</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumen.title}</h1>
      <p className="text-gray-600 mb-6">{resumen.description}</p>

      {/* Visor de PDF con react-pdf */}
      <div className="bg-gray-100 p-4 rounded shadow overflow-auto h-[80vh]">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p>Cargando documento...</p>}
          error={<p className="text-red-500">Error al cargar el documento PDF.</p>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={800}
            />
          ))}
        </Document>
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
