import axios from "axios";

const instance = axios.create({
  baseURL: "https://miback-1333.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🟢 Interceptor para incluir el token automáticamente
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Asegúrate de guardar aquí tu JWT al hacer login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔴 Interceptor para manejar errores 401 (token expirado)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Sesión expirada o no autorizada");
      // Opcional: redirigir al login o limpiar token
      localStorage.removeItem("token");
      // window.location.href = "/login"; // Descomenta si deseas forzar login
    }
    return Promise.reject(error);
  }
);

export default instance;
