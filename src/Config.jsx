// config/api.js
import axios from "./lib/axios";

// =====================
// URLs base
// =====================
const BASE_API_URL = "https://miback-1333.onrender.com/api/v1"; // API
const BASE_AUTH_URL = "https://miback-1333.onrender.com"; // Para CSRF/Login

// =====================
// Axios instance
// =====================
const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

// =====================
// Auth
// =====================
const Auth = {
  getCsrfCookie: () => axios.get(`${BASE_AUTH_URL}/sanctum/csrf-cookie`, { withCredentials: true }),
  register: (data) => api.post("/auth/register", data),
  login: async (data) => {
    await Auth.getCsrfCookie(); // Obtener CSRF cookie
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
// Public Universities
// =====================
const PublicUniversities = {
  getAll: (quantity) => api.get(`/public/universities/${quantity}`),
  getBySlug: (slug) => api.get(`/public/universities/${slug}`),
};

// =====================
// Public Careers
// =====================
const PublicCareers = {
  getAll: (quantity) => api.get(`/public/careers/${quantity}`),
  getBySlug: (slug) => api.get(`/public/careers/${slug}`),
};

// =====================
// Public Courses
// =====================
const PublicCourses = {
  getAll: (quantity = 120, params = {}) => api.get("/public/courses", { params: { quantity, ...params } }),
  getBySlug: (slug) => api.get(`/public/courses/${slug}`),
};

// =====================
// Public Plans
// =====================
const PublicPlans = {
  getAll: (quantity = 4, params = {}) => api.get("/public/plans", { params: { quantity, ...params } }),
  getBySlug: (slug) => api.get(`/public/plans/${slug}`),
};

// =====================
// Public Tests
// =====================
const PublicTests = {
  getActive: () => api.get("/public/tests/active"),
  getAll: () => api.get("/public/tests"),
  getById: (id) => api.get(`/public/tests/${id}`),
  getQuestions: (params = {}) => api.get("/public/questions", { params }),
  getAnswerOptions: (params = {}) => api.get("/public/answer-options", { params }),
};

// =====================
// Test Attempts
// =====================
const TestAttempts = {
  create: (data) => api.post("/user/test-attempts", data),
  getMy: () => api.get("/user/test-attempts"),
  getById: (id) => api.get(`/user/test-attempts/${id}`),
  answer: (id, data) => api.post(`/user/test-attempts/${id}/answer`, data),
  finish: (id) => api.post(`/user/test-attempts/${id}/finish`),
  getRecommendations: (id) => api.get(`/user/test-attempts/${id}/recommendations`),
};

// =====================
// Favorites
// =====================
const Favorites = {
  getAll: (params = {}) => api.get("/favorites", { params }),
  toggle: (payload) => api.post("/favorites", payload),
};

// =====================
// Daily Exercises
// =====================
const DailyExercises = {
  getToday: () => api.get("/user/daily-exercise/today"),
  submitAnswer: (data) => api.post("/user/daily-exercise/submit", data),
  getHistory: (params = {}) => api.get("/user/daily-exercise/history", { params }),
  getStreak: () => api.get("/user/streak"),

  // Admin
  getAll: (params = {}) => api.get("/admin/daily-exercises", { params }),
  create: (data) => api.post("/admin/daily-exercises", data),
  getById: (id) => api.get(`/admin/daily-exercises/${id}`),
  update: (id, data) => api.put(`/admin/daily-exercises/${id}`, data),
  delete: (id) => api.delete(`/admin/daily-exercises/${id}`),
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
  PublicTests,
  TestAttempts,
  Favorites,
  DailyExercises,
};

// =====================
// Named exports
// =====================
export {
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
  PublicTests,
  TestAttempts,
  Favorites,
  DailyExercises,
};
