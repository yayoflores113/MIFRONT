// src/lib/axios.js
import axios from "axios";

// ✅ URL de producción fija
const baseURL = "https://miback-1333.onrender.com/api/v1";

// 🔧 Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true, // déjalo en true solo si tu backend usa cookies/sesiones
});

// 🛠️ Interceptor para agregar automáticamente el token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Interceptor de respuesta para manejo de errores globales
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Si el token no es válido o expiró, limpiamos y redirigimos al login
      sessionStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    // No exponemos detalles técnicos en producción
    return Promise.reject({
      message:
        error.response?.data?.message ||
        "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
      status,
    });
  }
);

export default axiosInstance;
