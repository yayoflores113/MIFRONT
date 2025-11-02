import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://miback-1333.onrender.com/api/v1", // tu backend en Render
  timeout: 60000,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

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
