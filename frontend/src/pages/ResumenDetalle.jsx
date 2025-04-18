import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

  // Usa un archivo local asegurado en public/
  const pdfUrl = `http://localhost:8080/api/documents/download/${id}`;

  if (loading) return <p>Cargando resumen...</p>;
  if (!resumen) return <p>Error al cargar el resumen</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{resumen.title}</h1>
      <p className="text-gray-600 mb-4">{resumen.description}</p>

      <div className="bg-gray-100 p-4 rounded shadow overflow-auto h-[80vh]">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p>Cargando documento...</p>}
          error={<p className="text-red-500">Error al cargar el documento PDF.</p>}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page key={index} pageNumber={index + 1} width={800} />
          ))}
        </Document>
      </div>
    </div>
  );
}

export default ResumenDetalle;
