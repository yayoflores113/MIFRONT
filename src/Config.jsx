// config/api.js
import axios from "./lib/axios";

// URLs base
const BASE_API_URL = "https://miback-1333.onrender.com/api/v1";
const BASE_AUTH_URL = "https://miback-1333.onrender.com";

// =====================
// Axios para API
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
    await Auth.getCsrfCookie();
    return api.post("/auth/login", data);
  },
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

// =====================
// Admin
// =====================
const AdminUsers = {
  getAll: () => api.get("/admin/users"),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

const AdminUniversities = {
  getAll: () => api.get("/admin/universities"),
  create: (data) => api.post("/admin/universities", data),
  getById: (id) => api.get(`/admin/universities/${id}`),
  update: (id, data) => api.put(`/admin/universities/${id}`, data),
  delete: (id) => api.delete(`/admin/universities/${id}`),
};

const AdminCareers = {
  getAll: () => api.get("/admin/careers"),
  create: (data) => api.post("/admin/careers", data),
  getById: (id) => api.get(`/admin/careers/${id}`),
  update: (id, data) => api.put(`/admin/careers/${id}`, data),
  delete: (id) => api.delete(`/admin/careers/${id}`),
};

const AdminCourses = {
  getAll: () => api.get("/admin/courses"),
  create: (data) => api.post("/admin/courses", data),
  getById: (id) => api.get(`/admin/courses/${id}`),
  update: (id, data) => api.put(`/admin/courses/${id}`, data),
  delete: (id) => api.delete(`/admin/courses/${id}`),
};

const AdminPlans = {
  getAll: () => api.get("/admin/plans"),
  create: (data) => api.post("/admin/plans", data),
  getById: (id) => api.get(`/admin/plans/${id}`),
  update: (id, data) => api.put(`/admin/plans/${id}`, data),
  delete: (id) => api.delete(`/admin/plans/${id}`),
};

const AdminSubscriptions = {
  getAll: (params) => api.get("/user/subscriptions", { params }),
  getById: (id) => api.get(`/user/subscriptions/${id}`),
  create: (data) => api.post("/admin/subscriptions", data),
  update: (id, data) => api.put(`/admin/subscriptions/${id}`, data),
  delete: (id) => api.delete(`/admin/subscriptions/${id}`),
};

// =====================
// Public
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
// TestAttempts
// =====================
const TestAttempts = {
  getAll: (params) => api.get("/user/test-attempts", { params }),
  getById: (id) => api.get(`/user/test-attempts/${id}`),
  create: (data) => api.post("/user/test-attempts", data),
  update: (id, data) => api.put(`/user/test-attempts/${id}`, data),
  delete: (id) => api.delete(`/user/test-attempts/${id}`),
};

// =====================
// Favorites
// =====================
const Favorites = {
  getAll: () => api.get("/user/favorites"),
  add: (data) => api.post("/user/favorites", data),
  remove: (id) => api.delete(`/user/favorites/${id}`),
};

// =====================
// LearningPaths
// =====================
const LearningPaths = {
  getAll: () => api.get("/user/learning-paths"),
  getById: (id) => api.get(`/user/learning-paths/${id}`),
  create: (data) => api.post("/user/learning-paths", data),
  update: (id, data) => api.put(`/user/learning-paths/${id}`, data),
  delete: (id) => api.delete(`/user/learning-paths/${id}`),
};

// =====================
// Export default con aliases
// =====================
export default {
  // Auth
  getRegister: Auth.register,
  getLogin: Auth.login,
  getLogout: Auth.logout,
  getMe: Auth.me,

  // Admin Users
  getUserAll: AdminUsers.getAll,
  getUserById: AdminUsers.getById,
  getUserUpdate: (data, id) => AdminUsers.update(id, data),
  getUserDelete: AdminUsers.delete,

  // Admin Universities
  getUniversitiesAll: AdminUniversities.getAll,
  getUniversityById: AdminUniversities.getById,
  createUniversity: AdminUniversities.create,
  updateUniversity: (data, id) => AdminUniversities.update(id, data),
  deleteUniversity: AdminUniversities.delete,

  // Admin Careers
  getCareersAll: AdminCareers.getAll,
  getCareerById: AdminCareers.getById,
  createCareer: AdminCareers.create,
  updateCareer: (data, id) => AdminCareers.update(id, data),
  deleteCareer: AdminCareers.delete,

  // Admin Courses
  getCoursesAll: AdminCourses.getAll,
  getCourseById: AdminCourses.getById,
  createCourse: AdminCourses.create,
  updateCourse: (data, id) => AdminCourses.update(id, data),
  deleteCourse: AdminCourses.delete,

  // Admin Plans
  getPlansAll: AdminPlans.getAll,
  getPlanById: AdminPlans.getById,
  createPlan: AdminPlans.create,
  updatePlan: (data, id) => AdminPlans.update(id, data),
  deletePlan: AdminPlans.delete,

  // Admin Subscriptions
  getSubscriptionsAll: AdminSubscriptions.getAll,
  getSubscriptionById: AdminSubscriptions.getById,
  createSubscription: AdminSubscriptions.create,
  updateSubscription: (data, id) => AdminSubscriptions.update(id, data),
  deleteSubscription: AdminSubscriptions.delete,

  // Public
  getUniversities: PublicUniversities.getAll,
  getUniversityBySlug: PublicUniversities.getBySlug,
  getCareers: PublicCareers.getAll,
  getCareerBySlug: PublicCareers.getBySlug,
  getCourses: PublicCourses.getAll,
  getCourseBySlug: PublicCourses.getBySlug,
  getPlans: PublicPlans.getAll,
  getPlanBySlug: PublicPlans.getBySlug,

  // TestAttempts
  getTestAttempts: TestAttempts.getAll,
  getTestAttemptById: TestAttempts.getById,
  createTestAttempt: TestAttempts.create,
  updateTestAttempt: (data, id) => TestAttempts.update(id, data),
  deleteTestAttempt: TestAttempts.delete,

  // Favorites
  getFavorites: Favorites.getAll,
  addFavorite: Favorites.add,
  removeFavorite: Favorites.remove,

  // LearningPaths
  getLearningPaths: LearningPaths.getAll,
  getLearningPathById: LearningPaths.getById,
  createLearningPath: LearningPaths.create,
  updateLearningPath: (data, id) => LearningPaths.update(id, data),
  deleteLearningPath: LearningPaths.delete,
};
