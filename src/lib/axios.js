// src/lib/axios.js
import axios from "axios";

const isLocal = window.location.hostname.includes("localhost");
const baseURL = isLocal
  ? "http://localhost:8000/api/v1"
  : "https://miback-1333.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      if (window.location.pathname !== "/login") window.location.href = "/login";
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
