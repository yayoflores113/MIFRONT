import Axios from "axios";

const axios = Axios.create({
<<<<<<< HEAD
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
=======
  baseURL: "https://miback-1333.onrender.com/api/v1", // tu backend en Render
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c
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

<<<<<<< HEAD
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
=======
// 🟢 Agregar el token automáticamente a cada petición
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // o cambia a 'token' si usas ese nombre
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔴 Manejo global de errores
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    const error = {
      status: err.response?.status,
      original: err,
      validation: {},
      message: null,
    };

    switch (err.response?.status) {
      case 402:
        for (let field in err.response.data.errors) {
          error.validation[field] = err.response.data.errors[field][0];
        }
        break;
      case 403:
        error.message = "No tienes permiso para realizar esta acción.";
        break;
      case 401:
        error.message = "Por favor, inicia sesión nuevamente.";
        // Puedes limpiar el token si lo deseas:
        // localStorage.removeItem("auth_token");
        break;
      case 419:
        error.message = "CSRF token inválido. Refresca la página e inténtalo de nuevo.";
        break;
      case 500:
        error.message = "Error interno del servidor. Intenta más tarde.";
        break;
      default:
        error.message = "Ocurrió un error. Intenta más tarde.";
    }

    return Promise.reject(error);
  }
);

window.axios = axios;
axios.defaults.withCredentials = true;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default axios;
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c
