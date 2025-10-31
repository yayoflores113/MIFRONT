import axios from "axios";

// Detecta el entorno: local o producción
const baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

// Configuración general de Axios
const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Default: no enviar cookies, lo haremos por endpoint según necesidad
  withCredentials: false,
});

// Interceptor para agregar token si existe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Si usamos token, entonces enviamos cookies
      config.withCredentials = true;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para errores globales
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject({
      message:
        error.response?.data?.message ||
        "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
      status,
    });
  }
);

export default axiosInstance;
