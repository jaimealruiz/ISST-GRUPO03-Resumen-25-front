import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ResumenViewer({ idResumen }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const res = await axios.get(`/api/resumenes/${idResumen}/pdf`, {
          responseType: 'blob',
        });
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        setFile(URL.createObjectURL(pdfBlob));
      } catch (error) {
        console.error('Error al cargar el PDF', error);
      }
    };

    fetchPDF();
  }, [idResumen]);

  return file ? (
    <Document file={file}>
      <Page pageNumber={1} />
    </Document>
  ) : (
    <p>Cargando PDF...</p>
  );
}
