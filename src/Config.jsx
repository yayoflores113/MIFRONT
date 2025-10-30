// config/api.js
import axios from "./lib/axios";

// URLs base
const BASE_API_URL = "https://miback-1333.onrender.com/api/v1"; // Para rutas de API
const BASE_AUTH_URL = "https://miback-1333.onrender.com"; // Para Sanctum CSRF/login

// =====================
// Axios para API
// =====================
const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true, // necesario para enviar cookies
});

// =====================
// Auth
// =====================
const Auth = {
  getCsrfCookie: () => axios.get(`${BASE_AUTH_URL}/sanctum/csrf-cookie`, { withCredentials: true }),
  register: (data) => api.post("/auth/register", data),
  login: async (data) => {
    // Primero obtener la cookie CSRF
    await Auth.getCsrfCookie();
    return api.post("/auth/login", data);
  },
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

// =====================
// Admin Users
// =====================
const AdminUsers = {
  getAll: () => api.get("/admin/users"),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

// =====================
// Admin Universities
// =====================
const AdminUniversities = {
  getAll: () => api.get("/admin/universities"),
  create: (data) => api.post("/admin/universities", data),
  getById: (id) => api.get(`/admin/universities/${id}`),
  update: (id, data) => api.put(`/admin/universities/${id}`, data),
  delete: (id) => api.delete(`/admin/universities/${id}`),
};

// =====================
// Admin Careers
// =====================
const AdminCareers = {
  getAll: () => api.get("/admin/careers"),
  create: (data) => api.post("/admin/careers", data),
  getById: (id) => api.get(`/admin/careers/${id}`),
  update: (id, data) => api.put(`/admin/careers/${id}`, data),
  delete: (id) => api.delete(`/admin/careers/${id}`),
};

// =====================
// Admin Courses
// =====================
const AdminCourses = {
  getAll: () => api.get("/admin/courses"),
  create: (data) => api.post("/admin/courses", data),
  getById: (id) => api.get(`/admin/courses/${id}`),
  update: (id, data) => api.put(`/admin/courses/${id}`, data),
  delete: (id) => api.delete(`/admin/courses/${id}`),
};

// =====================
// Admin Plans
// =====================
const AdminPlans = {
  getAll: () => api.get("/admin/plans"),
  create: (data) => api.post("/admin/plans", data),
  getById: (id) => api.get(`/admin/plans/${id}`),
  update: (id, data) => api.put(`/admin/plans/${id}`, data),
  delete: (id) => api.delete(`/admin/plans/${id}`),
};

// =====================
// Admin Subscriptions
// =====================
const AdminSubscriptions = {
  getAll: (params) => api.get("/user/subscriptions", { params }),
  getById: (id) => api.get(`/user/subscriptions/${id}`),
  create: (data) => api.post("/admin/subscriptions", data),
  update: (id, data) => api.put(`/admin/subscriptions/${id}`, data),
  delete: (id) => api.delete(`/admin/subscriptions/${id}`),
};

// =====================
// Public Routes
// =====================
const PublicUniversities = {
  getAll: (quantity) => api.get(`/public/universities/${quantity}`),
  getBySlug: (slug) => api.get(`/public/universities/${slug}`),
};

const PublicCareers = {
  getAll: (quantity) => api.get(`/public/careers/${quantity}`),
  getBySlug: (slug) => api.get(`/public/careers/${slug}`),
};

const PublicCourses = {
  getAll: (quantity = 120, params = {}) => api.get("/public/courses", { params: { quantity, ...params } }),
  getBySlug: (slug) => api.get(`/public/courses/${slug}`),
};

const PublicPlans = {
  getAll: (quantity = 4, params = {}) => api.get("/public/plans", { params: { quantity, ...params } }),
  getBySlug: (slug) => api.get(`/public/plans/${slug}`),
};

// =====================
// Export default
// =====================
export default {
  Auth,
  AdminUsers,
  AdminUniversities,
  AdminCareers,
  AdminCourses,
  AdminPlans,
  AdminSubscriptions,
  PublicUniversities,
  PublicCareers,
  PublicCourses,
  PublicPlans,
};
