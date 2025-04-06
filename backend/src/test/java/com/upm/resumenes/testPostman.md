1. REGISTRO de usuario
Método: POST
URL: http://localhost:8080/api/auth/signup
Body (JSON):

{
  "email": "test@correo.com",
  "password": "1234"
}
 Esperado: 201 OK + objeto User con id, email, isWriter=false.

2. LOGIN
Método: POST
URL: http://localhost:8080/api/auth/login
Body (JSON):

{
  "email": "test@correo.com",
  "password": "1234"
}
Esperado: 200 OK + objeto User.


3. VER USUARIO LOGUEADO
Método: GET
URL: http://localhost:8080/api/auth/me

Esperado: Devuelve el usuario logueado (si se guardó bien la sesión).

Si no estás logueado, debe dar error: "No hay sesión activa".

4. VER CATÁLOGO GRATIS (visitante)
Método: GET
URL: http://localhost:8080/api/documents/free

Esperado: Lista de documentos gratuitos (aunque sea vacía al principio).

5. VER TODO EL CATÁLOGO (registrado)
Método: GET
URL: http://localhost:8080/api/documents/all

Requiere sesión activa.

Esperado: Lista completa de documentos (gratis y no gratis).

6. SUBIR DOCUMENTO (escritor)
Primero cambia isWriter=true manualmente en base de datos o en la app para el usuario con el que pruebas.

Método: POST
URL: http://localhost:8080/api/documents/upload
Body (form-data):

title: Ejemplo
description: Este es un resumen de prueba
isFree: true
file: [selecciona un PDF]
Esperado: Devuelve el objeto Document creado.

7. DESCARGAR PDF
Método: GET
URL: http://localhost:8080/api/documents/download/{id}
Luego accede al link que te devuelve, por ejemplo:
