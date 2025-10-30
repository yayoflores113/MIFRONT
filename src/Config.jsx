// src/config/Config.js
import axios from "../lib/axios";

const base_api_url = "https://miback-1333.onrender.com/api/v1";

// -------------------- AUTH --------------------
const Auth = {
  register: (data) => axios.post(`${base_api_url}/auth/register`, data),
  login: (data) => axios.post(`${base_api_url}/auth/login`, data),
  logout: () => axios.post(`${base_api_url}/auth/logout`),
  me: () => axios.get(`${base_api_url}/auth/me`),
};

// -------------------- ADMIN USERS --------------------
const AdminUsers = {
  getAll: () => axios.get(`${base_api_url}/admin/users`),
  getById: (id) => axios.get(`${base_api_url}/admin/users/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/users/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/users/${id}`),
};

// -------------------- ADMIN UNIVERSITIES --------------------
const AdminUniversities = {
  getAll: () => axios.get(`${base_api_url}/admin/universities`),
  create: (data) => axios.post(`${base_api_url}/admin/universities`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/universities/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/universities/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/universities/${id}`),
};

// -------------------- ADMIN CAREERS --------------------
const AdminCareers = {
  getAll: () => axios.get(`${base_api_url}/admin/careers`),
  create: (data) => axios.post(`${base_api_url}/admin/careers`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/careers/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/careers/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/careers/${id}`),
};

// -------------------- ADMIN COURSES --------------------
const AdminCourses = {
  getAll: () => axios.get(`${base_api_url}/admin/courses`),
  create: (data) => axios.post(`${base_api_url}/admin/courses`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/courses/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/courses/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/courses/${id}`),
};

// -------------------- ADMIN PLANS --------------------
const AdminPlans = {
  getAll: () => axios.get(`${base_api_url}/admin/plans`),
  create: (data) => axios.post(`${base_api_url}/admin/plans`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/plans/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/plans/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/plans/${id}`),
};

// -------------------- ADMIN SUBSCRIPTIONS --------------------
const AdminSubscriptions = {
  getAll: (params) => axios.get(`${base_api_url}/admin/subscriptions`, { params }),
  getById: (id) => axios.get(`${base_api_url}/admin/subscriptions/${id}`),
  create: (data) => axios.post(`${base_api_url}/admin/subscriptions`, data),
  update: (id, data) => axios.put(`${base_api_url}/admin/subscriptions/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/subscriptions/${id}`),
};

// -------------------- PUBLIC UNIVERSITIES --------------------
const PublicUniversities = {
  getAll: (quantity = 10) => axios.get(`${base_api_url}/public/universities/${quantity}`),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/universities/${slug}`),
};

// -------------------- PUBLIC CAREERS --------------------
const PublicCareers = {
  getAll: (quantity = 10) => axios.get(`${base_api_url}/public/careers/${quantity}`),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/careers/${slug}`),
};

// -------------------- PUBLIC COURSES --------------------
const PublicCourses = {
  getAll: (quantity = 120, params = {}) =>
    axios.get(`${base_api_url}/public/courses`, { params: { quantity, ...params } }),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/courses/${slug}`),
};

// -------------------- PUBLIC PLANS --------------------
const PublicPlans = {
  getAll: (quantity = 4, params = {}) =>
    axios.get(`${base_api_url}/public/plans`, { params: { quantity, ...params } }),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/plans/${slug}`),
};

// -------------------- PUBLIC TESTS --------------------
const PublicTests = {
  getActive: () => axios.get(`${base_api_url}/public/tests/active`),
  getAll: () => axios.get(`${base_api_url}/public/tests`),
  getById: (id) => axios.get(`${base_api_url}/public/tests/${id}`),
  getQuestions: (params = {}) => axios.get(`${base_api_url}/public/questions`, { params }),
  getAnswerOptions: (params = {}) => axios.get(`${base_api_url}/public/answer-options`, { params }),
};

// -------------------- TEST ATTEMPTS --------------------
const TestAttempts = {
  create: (data) => axios.post(`${base_api_url}/user/test-attempts`, data),
  getMy: () => axios.get(`${base_api_url}/user/test-attempts`),
  getById: (id) => axios.get(`${base_api_url}/user/test-attempts/${id}`),
  answer: (id, data) => axios.post(`${base_api_url}/user/test-attempts/${id}/answer`, data),
  finish: (id) => axios.post(`${base_api_url}/user/test-attempts/${id}/finish`),
  getRecommendations: (id) => axios.get(`${base_api_url}/user/test-attempts/${id}/recommendations`),
};

// -------------------- FAVORITES --------------------
const Favorites = {
  getAll: (params = {}) => axios.get(`${base_api_url}/favorites`, { params }),
  toggle: (payload) => axios.post(`${base_api_url}/favorites`, payload),
};

// -------------------- LEARNING PATHS --------------------
const PublicLearningPaths = {
  getAll: () => axios.get(`${base_api_url}/public/learning-paths`),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/learning-paths/${slug}`),
};

const AdminLearningPaths = {
  getAll: () => axios.get(`${base_api_url}/admin/learning-paths`),
  create: (data) => axios.post(`${base_api_url}/admin/learning-paths`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/learning-paths/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/learning-paths/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/learning-paths/${id}`),
};

// -------------------- DAILY EXERCISES --------------------
const DailyExercises = {
  getToday: () => axios.get(`${base_api_url}/user/daily-exercise/today`),
  submitAnswer: (data) => axios.post(`${base_api_url}/user/daily-exercise/submit`, data),
  getHistory: (params = {}) => axios.get(`${base_api_url}/user/daily-exercise/history`, { params }),
};

const AdminDailyExercises = {
  getAll: (params = {}) => axios.get(`${base_api_url}/admin/daily-exercises`, { params }),
  create: (data) => axios.post(`${base_api_url}/admin/daily-exercises`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/daily-exercises/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/daily-exercises/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/daily-exercises/${id}`),
};

// -------------------- USER STREAK --------------------
const UserStreak = {
  get: () => axios.get(`${base_api_url}/user/streak`),
};

// ✅ EXPORT DEFAULT - Funciones individuales que puedes usar directamente
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

  // ✅ Public Universities - ESTA ES LA FUNCIÓN QUE NECESITAS
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

// ✅ EXPORT NAMED - Para imports específicos si los necesitas
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
