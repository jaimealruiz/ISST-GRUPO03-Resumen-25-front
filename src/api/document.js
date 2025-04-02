export async function getFreeDocuments() {
  const res = await fetch("http://localhost:8080/api/documents/free", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo obtener el catálogo gratuito");
  return await res.json();
}


export async function getAllDocuments() {
  const res = await fetch("http://localhost:8080/api/documents/all", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo obtener el catálogo completo");
  return await res.json();
}


export async function uploadDocument(formData) {
  const res = await fetch("http://localhost:8080/api/documents/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("No se pudo subir el resumen");
  return await res.json();
}
