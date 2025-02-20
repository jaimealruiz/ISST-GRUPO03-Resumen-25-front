# Resumen.es

## 📌 Descripción del Proyecto
Resumen.es es una plataforma web que ofrece **resúmenes de libros y artículos de cultura empresarial y desarrollo personal** en formato texto y audio. Su objetivo es proporcionar resúmenes de calidad que puedan ser leídos o escuchados en **20 minutos**, permitiendo a los usuarios obtener información clave sin necesidad de leer volúmenes extensos.

El modelo de negocio es **freemium**, ofreciendo acceso gratuito a algunos resúmenes de muestra, y una suscripción de pago mensual **pfemium** para acceder al catálogo completo. Además, el servicio actúa como un **Marketplace**, permitiendo que escritores autónomos suban sus propios resúmenes, que tras revisión pasan a formar parte del catálogo y generan ingresos en función de audiencia y valoración de los usuarios.

## 📁 Estructura del Repositorio
```
ISST-GRUPO03-Resumen-25/
├── backend/      # Código del backend en Spring Boot
├── frontend/     # Código del frontend en React
├── docs/         # Documentación del proyecto
├── .gitignore    # Archivos a ignorar en Git
├── README.md     # Este archivo
```

## 🚀 Tecnologías Utilizadas
### 🔹 Frontend (React)
- React 18+
- Vite (para optimización)
- TailwindCSS (para estilos)
- Axios (para peticiones HTTP)

### 🔹 Backend (Spring Boot)
- Spring Boot 3.4.2
- Spring Web (API REST)
- Spring Data JPA (Base de datos)
- PostgreSQL (Persistencia de datos)
- Spring Security (Autenticación y autorización)
- Lombok (Reducción de código repetitivo)

## 🛠️ Instalación y Configuración
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/jaimealruiz/ISST-GRUPO03-Resumen-25.git
cd ISST-GRUPO03-Resumen-25
```

### 2️⃣ Backend (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 🌍 Configuración de Variables de Entorno
Crear un archivo `.env` en el directorio `backend/` con las credenciales de la base de datos:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/resumenes
SPRING_DATASOURCE_USERNAME=usuario
SPRING_DATASOURCE_PASSWORD=contraseña
```

En el directorio `frontend/`, configurar el archivo `.env`:
```
VITE_API_URL=http://localhost:8080
```

## 📌 Funcionalidades del Servicio
- 🎧 Lectura y escucha de resúmenes en formato texto y audio.
- 🔍 Búsqueda y recomendación de resúmenes según preferencias del usuario.
- 👤 Suscripción de usuarios para acceder al catálogo completo.
- ✍️ Posibilidad de que escritores autónomos suban resúmenes revisados.
- 💰 Remuneración basada en audiencia y valoración de los resúmenes.

## 🏗️ Roadmap
✅ Configurar estructura inicial del repositorio  
🔄 Implementar endpoints del backend  
🎨 Diseñar la interfaz de usuario  
🧠 Configurar autenticación/autorización  
📢 Desplegar en producción  

## 👥 Equipo
- [jaimealruiz](https://github.com/jaimealruiz) - Product Owner
- [masilea](https://github.com/masilea) - Scrum Master
- [ainaramartin](https://github.com/ainaramartin) - Development Team
- [jlemonn1](https://github.com/jlemonn1) - Development Team
- [looreea](https://github.com/looreea) - Development Team
- [jmolinab9](https://github.com/jmolinab9) - Development Team

