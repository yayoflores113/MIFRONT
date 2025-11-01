import axios from "./lib/axios";

const base_api_url = "/api/v1"; // axios.js ya tiene baseURL

const Auth = {
  register: (data) => axios.post(`${base_api_url}/auth/register`, data),
  login: (data) => axios.post(`${base_api_url}/auth/login`, data),
  logout: () => axios.post(`${base_api_url}/auth/logout`),
  me: () => axios.get(`${base_api_url}/auth/me`),
};

const AdminUsers = {
  getAll: () => axios.get(`${base_api_url}/admin/users`),
  getById: (id) => axios.get(`${base_api_url}/admin/users/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/users/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/users/${id}`),
};

const AdminUniversities = {
  getAll: () => axios.get(`${base_api_url}/admin/universities`),
  create: (data) => axios.post(`${base_api_url}/admin/universities`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/universities/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/universities/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/universities/${id}`),
};

const AdminCareers = {
  getAll: () => axios.get(`${base_api_url}/admin/careers`),
  create: (data) => axios.post(`${base_api_url}/admin/careers`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/careers/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/careers/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/careers/${id}`),
};

const AdminCourses = {
  getAll: () => axios.get(`${base_api_url}/admin/courses`),
  create: (data) => axios.post(`${base_api_url}/admin/courses`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/courses/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/courses/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/courses/${id}`),
};

const AdminPlans = { 
  getAll: () => axios.get(`${base_api_url}/admin/plans`),
  create: (data) => axios.post(`${base_api_url}/admin/plans`, data),
  getById: (id) => axios.get(`${base_api_url}/admin/plans/${id}`),
  update: (id, data) => axios.put(`${base_api_url}/admin/plans/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/plans/${id}`),
};

const AdminSubscriptions = {
  getAll: (params) => axios.get(`${base_api_url}/user/subscriptions`, { params }),
  getById: (id) => axios.get(`${base_api_url}/user/subscriptions/${id}`),
  create: (data) => axios.post(`${base_api_url}/admin/subscriptions`, data),
  update: (id, data) => axios.put(`${base_api_url}/admin/subscriptions/${id}`, data),
  delete: (id) => axios.delete(`${base_api_url}/admin/subscriptions/${id}`),
};

const PublicUniversities = {
  getAll: (quantity) => axios.get(`${base_api_url}/public/universities/${quantity}`),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/universities/${slug}`),
};

const PublicCareers = {
  getAll: (quantity) => axios.get(`${base_api_url}/public/careers/${quantity}`),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/careers/${slug}`),
};

const PublicCourses = {
  getAll: (quantity = 120, params = {}) =>
    axios.get(`${base_api_url}/public/courses`, { params: { quantity, ...params } }),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/courses/${slug}`),
};

const PublicPlans = {
  getAll: (quantity = 4, params = {}) =>
    axios.get(`${base_api_url}/public/plans`, { params: { quantity, ...params } }),
  getBySlug: (slug) => axios.get(`${base_api_url}/public/plans/${slug}`),
};

const PublicTests = {
  getActive: () => axios.get(`${base_api_url}/public/tests/active`),
  getAll: () => axios.get(`${base_api_url}/public/tests`),
  getById: (id) => axios.get(`${base_api_url}/public/tests/${id}`),
  getQuestions: (params = {}) => axios.get(`${base_api_url}/public/questions`, { params }),
  getAnswerOptions: (params = {}) => axios.get(`${base_api_url}/public/answer-options`, { params }),
};

// ============================================
// USER - Test Attempts (privado)
// ============================================
const TestAttempts = {
  create: (data) => axios.post(`${base_api_url}/user/test-attempts`, data),
  getMy: () => axios.get(`${base_api_url}/user/test-attempts`),
  getById: (id) => axios.get(`${base_api_url}/user/test-attempts/${id}`),
  answer: (id, data) => axios.post(`${base_api_url}/user/test-attempts/${id}/answer`, data),
  finish: (id) => axios.post(`${base_api_url}/user/test-attempts/${id}/finish`),
  getRecommendations: (id) => axios.get(`${base_api_url}/user/test-attempts/${id}/recommendations`),
};

// ============================================
// USER - Favorites (privado con Sanctum)
// ============================================
const Favorites = {
  getAll: (params = {}) => axios.get(`${base_api_url}/favorites`, { params }),
  toggle: (payload) => axios.post(`${base_api_url}/favorites`, payload),
};

// ============================================
// EXPORT (retrocompatible con tu código existente)
// ============================================
export default {
  getRegister: Auth.register,
  getLogin: Auth.login,
  getLogout: Auth.logout,
  getMe: Auth.me,

  getUserAll: AdminUsers.getAll,
  getUserById: AdminUsers.getById,
  getUserUpdate: (data, id) => AdminUsers.update(id, data),
  getUserDelete: AdminUsers.delete,

  getUniversidadesAll: AdminUniversities.getAll,
  getUniversidadesStore: AdminUniversities.create,
  getUniversidadesById: AdminUniversities.getById,
  getUniversidadesUpdate: (data, id) => AdminUniversities.update(id, data),
  getUniversidadesDeleteById: AdminUniversities.delete,

  getCarrerasAll: AdminCareers.getAll,
  getCarrerasStore: AdminCareers.create,
  getCarrerasShow: AdminCareers.getById,
  getCarrerasUpdate: (data, id) => AdminCareers.update(id, data),
  getCarrerasDestroy: AdminCareers.delete,

  getCursosAll: AdminCourses.getAll,
  getCursosStore: AdminCourses.create,
  getCursosShow: AdminCourses.getById,
  getCursosUpdate: (data, id) => AdminCourses.update(id, data),
  getCursosDestroy: AdminCourses.delete,

  getPlanesAll: AdminPlans.getAll,
  getPlanesStore: AdminPlans.create,
  getPlanesShow: AdminPlans.getById,
  getPlanesUpdate: (data, id) => AdminPlans.update(id, data),
  getPlanesDestroy: AdminPlans.delete,

  getSubscriptionsAll: AdminSubscriptions.getAll,
  getSubscriptionShow: AdminSubscriptions.getById,
  createSubscription: AdminSubscriptions.create,
  updateSubscription: (data, id) => AdminSubscriptions.update(id, data),
  deleteSubscription: AdminSubscriptions.delete,

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

  createTestAttempt: TestAttempts.create,
  getMyTestAttempts: TestAttempts.getMy,
  getTestAttempt: TestAttempts.getById,
  answerAttempt: TestAttempts.answer,
  finishAttempt: TestAttempts.finish,
  getAttemptRecommendations: TestAttempts.getRecommendations,

  getFavorites: Favorites.getAll,
  toggleFavorite: Favorites.toggle,

  // ========================================
  // 🎯 DAILY EXERCISES (NUEVO - privado)
  // ========================================

  /**
   * Obtener el ejercicio del día para el usuario autenticado
   * @returns {Promise} Ejercicio disponible o información de completado
   */
  getTodayExercise: () =>
    axios.get(`${base_api_url}/user/daily-exercise/today`),

  /**
   * Enviar respuesta del usuario para un ejercicio
   * @param {Object} data - { exercise_id, answer, time_spent }
   * @returns {Promise} Resultado de la validación
   */
  submitExerciseAnswer: (data) =>
    axios.post(`${base_api_url}/user/daily-exercise/submit`, data),

  /**
   * Obtener la racha actual del usuario
   * @returns {Promise} Información de racha y puntos
   */
  getUserStreak: () => axios.get(`${base_api_url}/user/streak`),

  /**
   * Obtener historial de ejercicios completados
   * @param {Object} params - Parámetros de filtrado opcionales
   * @returns {Promise} Lista de ejercicios completados
   */
  getUserExerciseHistory: (params = {}) =>
    axios.get(`${base_api_url}/user/daily-exercise/history`, { params }),

  // ========================================
  // 🔧 ADMIN - DAILY EXERCISES (NUEVO)
  // ========================================

  /**
   * ADMIN: Obtener todos los ejercicios
   * @param {Object} params - Filtros opcionales (course_id, difficulty, etc.)
   */
  getExercisesAll: (params = {}) =>
    axios.get(`${base_api_url}/admin/daily-exercises`, { params }),

  /**
   * ADMIN: Crear un nuevo ejercicio
   * @param {Object} data - Datos del ejercicio
   */
  createExercise: (data) =>
    axios.post(`${base_api_url}/admin/daily-exercises`, data),

  /**
   * ADMIN: Obtener ejercicio por ID
   * @param {Number} id - ID del ejercicio
   */
  getExerciseById: (id) =>
    axios.get(`${base_api_url}/admin/daily-exercises/${id}`),

  /**
   * ADMIN: Actualizar ejercicio
   * @param {Number} id - ID del ejercicio
   * @param {Object} data - Datos actualizados
   */
  updateExercise: (id, data) =>
    axios.put(`${base_api_url}/admin/daily-exercises/${id}`, data),

  /**
   * ADMIN: Eliminar ejercicio
   * @param {Number} id - ID del ejercicio
   */
  deleteExercise: (id) =>
    axios.delete(`${base_api_url}/admin/daily-exercises/${id}`),
};

// Exporta también los módulos organizados (nuevo patrón recomendado)
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
};
