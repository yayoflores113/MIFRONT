// src/Config.jsx
import axios from "./lib/axios";

// -------------------- AUTH --------------------
const Auth = {
  register: (data) => axios.post("/auth/register", data),
  login: (data) => axios.post("/auth/login", data),
  logout: () => axios.post("/auth/logout"),
  me: () => axios.get("/auth/me"),
};

// -------------------- ADMIN USERS --------------------
const AdminUsers = {
  getAll: () => axios.get("/admin/users"),
  getById: (id) => axios.get(`/admin/users/${id}`),
  update: (id, data) => axios.put(`/admin/users/${id}`, data),
  delete: (id) => axios.delete(`/admin/users/${id}`),
};

// -------------------- ADMIN UNIVERSITIES --------------------
const AdminUniversities = {
  getAll: () => axios.get("/admin/universities"),
  create: (data) => axios.post("/admin/universities", data),
  getById: (id) => axios.get(`/admin/universities/${id}`),
  update: (id, data) => axios.put(`/admin/universities/${id}`, data),
  delete: (id) => axios.delete(`/admin/universities/${id}`),
};

// -------------------- ADMIN CAREERS --------------------
const AdminCareers = {
  getAll: () => axios.get("/admin/careers"),
  create: (data) => axios.post("/admin/careers", data),
  getById: (id) => axios.get(`/admin/careers/${id}`),
  update: (id, data) => axios.put(`/admin/careers/${id}`, data),
  delete: (id) => axios.delete(`/admin/careers/${id}`),
};

// -------------------- ADMIN COURSES --------------------
const AdminCourses = {
  getAll: () => axios.get("/admin/courses"),
  create: (data) => axios.post("/admin/courses", data),
  getById: (id) => axios.get(`/admin/courses/${id}`),
  update: (id, data) => axios.put(`/admin/courses/${id}`, data),
  delete: (id) => axios.delete(`/admin/courses/${id}`),
};

// -------------------- ADMIN PLANS --------------------
const AdminPlans = {
  getAll: () => axios.get("/admin/plans"),
  create: (data) => axios.post("/admin/plans", data),
  getById: (id) => axios.get(`/admin/plans/${id}`),
  update: (id, data) => axios.put(`/admin/plans/${id}`, data),
  delete: (id) => axios.delete(`/admin/plans/${id}`),
};

// -------------------- ADMIN SUBSCRIPTIONS --------------------
const AdminSubscriptions = {
  getAll: (params) => axios.get("/admin/subscriptions", { params }),
  getById: (id) => axios.get(`/admin/subscriptions/${id}`),
  create: (data) => axios.post("/admin/subscriptions", data),
  update: (id, data) => axios.put(`/admin/subscriptions/${id}`, data),
  delete: (id) => axios.delete(`/admin/subscriptions/${id}`),
};

// -------------------- PUBLIC UNIVERSITIES --------------------
const PublicUniversities = {
  getAll: (quantity = 10) => axios.get(`/public/universities/${quantity}`),
  getBySlug: (slug) => axios.get(`/public/universities/${slug}`),
};

// -------------------- PUBLIC CAREERS --------------------
const PublicCareers = {
  getAll: (quantity = 10) => axios.get(`/public/careers/${quantity}`),
  getBySlug: (slug) => axios.get(`/public/careers/${slug}`),
};

// -------------------- PUBLIC COURSES --------------------
const PublicCourses = {
  getAll: (quantity = 120, params = {}) =>
    axios.get("/public/courses", { params: { quantity, ...params } }),
  getBySlug: (slug) => axios.get(`/public/courses/${slug}`),
};

// -------------------- PUBLIC PLANS --------------------
const PublicPlans = {
  getAll: (quantity = 4, params = {}) =>
    axios.get("/public/plans", { params: { quantity, ...params } }),
  getBySlug: (slug) => axios.get(`/public/plans/${slug}`),
};

// -------------------- PUBLIC TESTS --------------------
const PublicTests = {
  getActive: () => axios.get("/public/tests/active"),
  getAll: () => axios.get("/public/tests"),
  getById: (id) => axios.get(`/public/tests/${id}`),
  getQuestions: (params = {}) => axios.get("/public/questions", { params }),
  getAnswerOptions: (params = {}) => axios.get("/public/answer-options", { params }),
};

// -------------------- TEST ATTEMPTS --------------------
const TestAttempts = {
  create: (data) => axios.post("/user/test-attempts", data),
  getMy: () => axios.get("/user/test-attempts"),
  getById: (id) => axios.get(`/user/test-attempts/${id}`),
  answer: (id, data) => axios.post(`/user/test-attempts/${id}/answer`, data),
  finish: (id) => axios.post(`/user/test-attempts/${id}/finish`),
  getRecommendations: (id) => axios.get(`/user/test-attempts/${id}/recommendations`),
};

// -------------------- FAVORITES --------------------
const Favorites = {
  getAll: (params = {}) => axios.get("/favorites", { params }),
  toggle: (payload) => axios.post("/favorites", payload),
};

// -------------------- LEARNING PATHS --------------------
const PublicLearningPaths = {
  getAll: () => axios.get("/public/learning-paths"),
  getBySlug: (slug) => axios.get(`/public/learning-paths/${slug}`),
};

const AdminLearningPaths = {
  getAll: () => axios.get("/admin/learning-paths"),
  create: (data) => axios.post("/admin/learning-paths", data),
  getById: (id) => axios.get(`/admin/learning-paths/${id}`),
  update: (id, data) => axios.put(`/admin/learning-paths/${id}`, data),
  delete: (id) => axios.delete(`/admin/learning-paths/${id}`),
};

// -------------------- DAILY EXERCISES --------------------
const DailyExercises = {
  getToday: () => axios.get("/user/daily-exercise/today"),
  submitAnswer: (data) => axios.post("/user/daily-exercise/submit", data),
  getHistory: (params = {}) => axios.get("/user/daily-exercise/history", { params }),
};

const AdminDailyExercises = {
  getAll: (params = {}) => axios.get("/admin/daily-exercises", { params }),
  create: (data) => axios.post("/admin/daily-exercises", data),
  getById: (id) => axios.get(`/admin/daily-exercises/${id}`),
  update: (id, data) => axios.put(`/admin/daily-exercises/${id}`, data),
  delete: (id) => axios.delete(`/admin/daily-exercises/${id}`),
};

// -------------------- USER STREAK --------------------
const UserStreak = {
  get: () => axios.get("/user/streak"),
};

// ✅ EXPORT DEFAULT
const Config = {
  // Auth
  register: Auth.register,
  login: Auth.login,
  logout: Auth.logout,
  getMe: Auth.me,

  // Admin Users
  getUserAll: AdminUsers.getAll,
  getUserById: AdminUsers.getById,
  updateUser: AdminUsers.update,
  deleteUser: AdminUsers.delete,

  // Admin Universities
  getUniversidadesAll: AdminUniversities.getAll,
  createUniversidad: AdminUniversities.create,
  getUniversidadById: AdminUniversities.getById,
  updateUniversidad: AdminUniversities.update,
  deleteUniversidad: AdminUniversities.delete,

  // Admin Careers
  getCarrerasAll: AdminCareers.getAll,
  createCarrera: AdminCareers.create,
  getCarreraById: AdminCareers.getById,
  updateCarrera: AdminCareers.update,
  deleteCarrera: AdminCareers.delete,

  // Admin Courses
  getCursosAll: AdminCourses.getAll,
  createCurso: AdminCourses.create,
  getCursoById: AdminCourses.getById,
  updateCurso: AdminCourses.update,
  deleteCurso: AdminCourses.delete,

  // Admin Plans
  getPlanesAll: AdminPlans.getAll,
  createPlan: AdminPlans.create,
  getPlanById: AdminPlans.getById,
  updatePlan: AdminPlans.update,
  deletePlan: AdminPlans.delete,

  // Admin Subscriptions
  getSubscriptionsAll: AdminSubscriptions.getAll,
  getSubscriptionById: AdminSubscriptions.getById,
  createSubscription: AdminSubscriptions.create,
  updateSubscription: AdminSubscriptions.update,
  deleteSubscription: AdminSubscriptions.delete,

  // Public Universities
  getUniversities: PublicUniversities.getAll,
  getUniversityBySlug: PublicUniversities.getBySlug,

  // Public Careers
  getCareers: PublicCareers.getAll,
  getCareerBySlug: PublicCareers.getBySlug,

  // Public Courses
  getCourses: PublicCourses.getAll,
  getCourseBySlug: PublicCourses.getBySlug,

  // Public Plans
  getPlans: PublicPlans.getAll,
  getPlanBySlug: PublicPlans.getBySlug,

  // Public Tests
  getActiveTests: PublicTests.getActive,
  getTests: PublicTests.getAll,
  getTestById: PublicTests.getById,
  getQuestions: PublicTests.getQuestions,
  getAnswerOptions: PublicTests.getAnswerOptions,

  // Test Attempts
  createTestAttempt: TestAttempts.create,
  getMyTestAttempts: TestAttempts.getMy,
  getTestAttempt: TestAttempts.getById,
  answerAttempt: TestAttempts.answer,
  finishAttempt: TestAttempts.finish,
  getAttemptRecommendations: TestAttempts.getRecommendations,

  // Favorites
  getFavorites: Favorites.getAll,
  toggleFavorite: Favorites.toggle,

  // Learning Paths
  getLearningPaths: PublicLearningPaths.getAll,
  getLearningPathBySlug: PublicLearningPaths.getBySlug,

  // Admin Learning Paths
  getAdminLearningPaths: AdminLearningPaths.getAll,
  createLearningPath: AdminLearningPaths.create,
  getAdminLearningPathById: AdminLearningPaths.getById,
  updateLearningPath: AdminLearningPaths.update,
  deleteLearningPath: AdminLearningPaths.delete,

  // Daily Exercises
  getTodayExercise: DailyExercises.getToday,
  submitExerciseAnswer: DailyExercises.submitAnswer,
  getUserExerciseHistory: DailyExercises.getHistory,

  // Admin Daily Exercises
  getExercisesAll: AdminDailyExercises.getAll,
  createExercise: AdminDailyExercises.create,
  getExerciseById: AdminDailyExercises.getById,
  updateExercise: AdminDailyExercises.update,
  deleteExercise: AdminDailyExercises.delete,

  // User Streak
  getUserStreak: UserStreak.get,
};

export default Config;

// ✅ EXPORT NAMED
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
  PublicLearningPaths,
  AdminLearningPaths,
  DailyExercises,
  AdminDailyExercises,
  UserStreak,
};
