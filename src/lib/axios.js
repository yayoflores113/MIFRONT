// src/lib/axios.js
import Axios from "axios";

// Base URL de tu API
const baseURL = import.meta.env?.VITE_API_BASE_URL || "https://miback-1333.onrender.com/api/v1";

const axios = Axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: false, // false porque usamos Bearer token, no cookies
});

// Interceptor para añadir Bearer token automáticamente
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta para manejar errores comunes
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = {
      status: error.response?.status,
      original: error,
      validation: {},
      message: null,
    };

    switch (error.response?.status) {
      case 401:
        err.message = "Sesión expirada. Por favor inicia sesión de nuevo.";
        break;
      case 403:
        err.message = "No tienes permiso para realizar esta acción.";
        break;
      case 419:
        err.message = "Token CSRF inválido. Refresca la página e inténtalo de nuevo.";
        break;
      case 500:
        err.message = "Error interno del servidor.";
        break;
      case 422:
        // Errores de validación
        if (error.response.data?.errors) {
          for (const field in error.response.data.errors) {
            err.validation[field] = error.response.data.errors[field][0];
          }
        }
        break;
      default:
        err.message = "Ocurrió un error, inténtalo más tarde.";
    }

    return Promise.reject(err);
  }
);

export default axios;
