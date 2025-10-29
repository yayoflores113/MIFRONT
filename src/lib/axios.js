import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env?.VITE_BACKEND_URL || "http://localhost:8000",
  timeout: 60000,
  withCredentials: true, // Envía cookies en todas las peticiones
  withXSRFToken: true,   // Envía token CSRF automáticamente
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  // CRÍTICO para cookies
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", // Laravel lo usa para identificar peticiones AJAX
  },
});

// Interceptor de errores
axios.interceptors.response.use(null, (err) => {
  const error = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null
  };
  
  switch (err.response?.status) {
    case 422: // Laravel validation errors
      for (let field in err.response.data.errors) {
        error.validation[field] = err.response.data.errors[field][0];
      }
      break;
    case 403:
      error.message = "No tienes permisos para esta acción.";
      break;
    case 401:
      error.message = "Por favor, inicia sesión nuevamente.";
      break;
    case 419:
      error.message = "Token CSRF inválido. Refresca la página.";
      break;
    case 500:
      error.message = "Error del servidor. Contacta soporte.";
      break;
    default:
      error.message = "Algo salió mal, intenta más tarde.";
  }
  
  return Promise.reject(error);
});

/**
 * Inicializa Sanctum obteniendo la cookie CSRF
 * DEBE llamarse antes de cualquier petición de autenticación
 */
export const ensureSanctum = async () => {
  try {
    // Esta llamada genera la cookie XSRF-TOKEN y la cookie de sesión
    await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
  } catch (e) {
    console.error("No se pudo inicializar Sanctum", e);
  }
};


export default axios;