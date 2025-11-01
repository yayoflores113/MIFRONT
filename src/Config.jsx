// src/Config.jsx
import axios from "./lib/axios";

const base_api_url = "https://miback-1333.onrender.com/api/v1";

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
  getById: (id) => id ? axios.get(`/admin/users/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/users/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/users/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN UNIVERSITIES --------------------
const AdminUniversities = {
  getAll: () => axios.get("/admin/universities"),
  create: (data) => axios.post("/admin/universities", data),
  getById: (id) => id ? axios.get(`/admin/universities/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/universities/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/universities/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN CAREERS --------------------
const AdminCareers = {
  getAll: () => axios.get("/admin/careers"),
  create: (data) => axios.post("/admin/careers", data),
  getById: (id) => id ? axios.get(`/admin/careers/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/careers/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/careers/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN COURSES --------------------
const AdminCourses = {
  getAll: () => axios.get("/admin/courses"),
  create: (data) => axios.post("/admin/courses", data),
  getById: (id) => id ? axios.get(`/admin/courses/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/courses/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/courses/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN PLANS --------------------
const AdminPlans = {
  getAll: () => axios.get("/admin/plans"),
  create: (data) => axios.post("/admin/plans", data),
  getById: (id) => id ? axios.get(`/admin/plans/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/plans/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/plans/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN SUBSCRIPTIONS --------------------
const AdminSubscriptions = {
  getAll: (params) => axios.get("/admin/subscriptions", { params }),
  getById: (id) => id ? axios.get(`/admin/subscriptions/${id}`) : Promise.reject("ID is undefined"),
  create: (data) => axios.post("/admin/subscriptions", data),
  update: (id, data) => id ? axios.put(`/admin/subscriptions/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/subscriptions/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN LEARNING PATHS --------------------
const AdminLearningPaths = {
  getAll: () => axios.get("/admin/learning-paths"),
  create: (data) => axios.post("/admin/learning-paths", data),
  getById: (id) => id ? axios.get(`/admin/learning-paths/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/learning-paths/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/learning-paths/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- ADMIN DAILY EXERCISES --------------------
const AdminDailyExercises = {
  getAll: (params = {}) => axios.get("/admin/daily-exercises", { params }),
  create: (data) => axios.post("/admin/daily-exercises", data),
  getById: (id) => id ? axios.get(`/admin/daily-exercises/${id}`) : Promise.reject("ID is undefined"),
  update: (id, data) => id ? axios.put(`/admin/daily-exercises/${id}`, data) : Promise.reject("ID is undefined"),
  delete: (id) => id ? axios.delete(`/admin/daily-exercises/${id}`) : Promise.reject("ID is undefined"),
};

// -------------------- PUBLIC --------------------
const PublicUniversities = {
  getAll: (quantity = 10) => axios.get(`/public/universities/${quantity}`),
  getBySlug: (slug) => slug ? axios.get(`/public/universities/${slug}`) : Promise.reject("Slug is undefined"),
};

const PublicCareers = {
  getAll: (quantity = 10) => axios.get(`/public/careers/${quantity}`),
  getBySlug: (slug) => slug ? axios.get(`/public/careers/${slug}`) : Promise.reject("Slug is undefined"),
};

const PublicCourses = {
  getAll: (quantity = 120, params = {}) => axios.get(`${base_api_url}/public/courses`, { params: { quantity, ...params } }),
  getBySlug: (slug) => slug ? axios.get(`${base_api_url}/public/courses/${slug}`) : Promise.reject("Slug is undefined"),
};

const PublicPlans = {
  getAll: (quantity = 4, params = {}) => axios.get(`${base_api_url}/public/plans`, { params: { quantity, ...params } }),
  getBySlug: (slug) => slug ? axios.get(`${base_api_url}/public/plans/${slug}`) : Promise.reject("Slug is undefined"),
};

const PublicTests = {
  getActive: () => axios.get("/public/tests/active"),
  getAll: () => axios.get("/public/tests"),
  getById: (id) => id ? axios.get(`/public/tests/${id}`) : Promise.reject("ID is undefined"),
  getQuestions: (params = {}) => axios.get("/public/questions", { params }),
  getAnswerOptions: (params = {}) => axios.get("/public/answer-options", { params }),
};

const TestAttempts = {
  create: (data) => axios.post("/user/test-attempts", data),
  getMy: () => axios.get("/user/test-attempts"),
  getById: (id) => id ? axios.get(`/user/test-attempts/${id}`) : Promise.reject("ID is undefined"),
  answer: (id, data) => id ? axios.post(`/user/test-attempts/${id}/answer`, data) : Promise.reject("ID is undefined"),
  finish: (id) => id ? axios.post(`/user/test-attempts/${id}/finish`) : Promise.reject("ID is undefined"),
  getRecommendations: (id) => id ? axios.get(`/user/test-attempts/${id}/recommendations`) : Promise.reject("ID is undefined"),
};

const Favorites = {
  getAll: (params = {}) => axios.get("/favorites", { params }),
  toggle: (payload) => axios.post("/favorites", payload),
};

const PublicLearningPaths = {
  getAll: () => axios.get("/public/learning-paths"),
  getBySlug: (slug) => slug ? axios.get(`/public/learning-paths/${slug}`) : Promise.reject("Slug is undefined"),
};

const DailyExercises = {
  getToday: () => axios.get("/user/daily-exercise/today"),
  submitAnswer: (data) => axios.post("/user/daily-exercise/submit", data),
  getHistory: (params = {}) => axios.get("/user/daily-exercise/history", { params }),
};

const UserStreak = {
  get: () => axios.get("/user/streak"),
};

// -------------------- EXPORT DEFAULT --------------------
export default {
  getRegister: Auth.register,
  getLogin: Auth.login,
  getLogout: Auth.logout,
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

  // Admin Daily Exercises
  getExercisesAll: AdminDailyExercises.getAll,
  createExercise: AdminDailyExercises.create,
  getExerciseById: AdminDailyExercises.getById,
  updateExercise: AdminDailyExercises.update,
  deleteExercise: AdminDailyExercises.delete,

  // Admin Learning Paths
  getLearningPathsAll: AdminLearningPaths.getAll,
  createLearningPath: AdminLearningPaths.create,
  getLearningPathById: AdminLearningPaths.getById,
  updateLearningPath: AdminLearningPaths.update,
  deleteLearningPath: AdminLearningPaths.delete,

  // Public
  getUniversities: PublicUniversities.getAll,
  getUniversityBySlug: PublicUniversities.getBySlug,
  getCareers: PublicCareers.getAll,
  getCareerBySlug: PublicCareers.getBySlug,
  getCourses: PublicCourses.getAll,
  getCourseBySlug: PublicCourses.getBySlug,
  getPlans: PublicPlans.getAll,
  getPlanBySlug: PublicPlans.getBySlug,
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

  // Daily Exercises User
  getTodayExercise: DailyExercises.getToday,
  submitExerciseAnswer: DailyExercises.submitAnswer,
  getUserExerciseHistory: DailyExercises.getHistory,

  // User Streak
  getUserStreak: UserStreak.get,
};

// -------------------- EXPORT NOMBRADO --------------------
export {
  Auth,
  AdminUsers,
  AdminUniversities,
  AdminCareers,
  AdminCourses,
  AdminPlans,
  AdminSubscriptions,
  AdminDailyExercises,
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
  UserStreak,
};
