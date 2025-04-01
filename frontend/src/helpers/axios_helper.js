import axios from 'axios';

// Crear una instancia de Axios con configuración base
const api = axios.create({
    baseURL: "http://localhost:9000",
    headers: {
      "Content-Type": "application/json"
    }
  });


export const getAuthToken = () => {
    return window.sessionStorage.getItem("auth_token");
};


export const setAuthHeader = (token) => {
    if (token !== null) {
        window.sessionStorage.setItem("auth_token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        window.sessionStorage.removeItem("auth_token");
        delete axios.defaults.headers.common["Authorization"];
    }
};


// Interceptor de solicitud para agregar siempre el token si está disponible
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Interceptor de respuesta para manejar errores globalmente (ejemplo: token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Aquí podrías disparar una acción de logout o redirigir al login.
        // Por ejemplo: logout();
        console.warn("Token expirado o no autorizado");
      }
      return Promise.reject(error);
    }
  );
  // Función para realizar peticiones genéricas
export const request = (method, url, data = null) => {
    return api({
      method,
      url,
      data
    });
  };
  

  // Función para subir archivos con un timeout extendido
  export const uploadFile = (method, url, file) => {
    const formData = new FormData();
    formData.append("file", file);
    
    return api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      timeout: 30000 // Timeout de 30 segundos
    });
  };
  
  export default api;
