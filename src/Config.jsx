import axios from "axios";

// ✅ CORREGIDO - Ahora tiene /api/v1 al final
const base_api_url = (import.meta?.env?.VITE_API_BASE_URL || "https://miback-1333.onrender.com/api/v1").trim();

// ❌ QUITAR - No necesitas cookies para API con Bearer tokens
// axios.defaults.withCredentials = true;

// 🔥 INTERCEPTOR MEJORADO - Sin JSON.parse innecesario
axios.interceptors.request.use(
  (config) => {
    // Obtener token de sessionStorage o localStorage
    let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
    console.log("🔑 Token original:", token ? token.substring(0, 50) + "..." : "NO HAY TOKEN");
    
    // Si el token está en formato JSON, parsearlo
    try {
      if (token && token.startsWith('{')) {
        token = JSON.parse(token);
      }
    } catch (e) {
      // Si falla el parse, usar el token tal cual
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  //Rutas privadas:

  // Login con Google
  getMe: () => axios.get(`${base_api_url}/auth/me`),

  // AUTH
  getRegister: (data) => axios.post(`${base_api_url}/auth/register`, data),
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: () => axios.post(`${base_api_url}/auth/logout`),

  // ROL ADMIN
  getUserAll: () => axios.get(`${base_api_url}/admin/users`),
  getUserById: (id) => axios.get(`${base_api_url}/admin/users/${id}`),
  getUserUpdate: (data, id) =>
    axios.put(`${base_api_url}/admin/users/${id}`, data),
  getUserDelete: (id) => axios.delete(`${base_api_url}/admin/users/${id}`),

  getUniversidadesAll: () => axios.get(`${base_api_url}/admin/universities`),
  getUniversidadesStore: (data) =>
    axios.post(`${base_api_url}/admin/universities`, data),
  getUniversidadesById: (id) =>
    axios.get(`${base_api_url}/admin/universities/${id}`),
  getUniversidadesUpdate: (data, id) =>
    axios.put(`${base_api_url}/admin/universities/${id}`, data),
  getUniversidadesDeleteById: (id) =>
    axios.delete(`${base_api_url}/admin/universities/${id}`),

  getCarrerasAll: () => axios.get(`${base_api_url}/admin/careers`),
  getCarrerasStore: (data) => axios.post(`${base_api_url}/admin/careers`, data),
  getCarrerasShow: (id) => axios.get(`${base_api_url}/admin/careers/${id}`),
  getCarrerasUpdate: (data, id) =>
    axios.put(`${base_api_url}/admin/careers/${id}`, data),
  getCarrerasDestroy: (id) =>
    axios.delete(`${base_api_url}/admin/careers/${id}`),

  getCursosAll: () => axios.get(`${base_api_url}/admin/courses`),
  getCursosStore: (data) => axios.post(`${base_api_url}/admin/courses`, data),
  getCursosShow: (id) => axios.get(`${base_api_url}/admin/courses/${id}`),
  getCursosUpdate: (data, id) =>
    axios.put(`${base_api_url}/admin/courses/${id}`, data),
  getCursosDestroy: (id) => axios.delete(`${base_api_url}/admin/courses/${id}`),

  getPlanesAll: () => axios.get(`${base_api_url}/admin/plans`),
  getPlanesStore: (data) => axios.post(`${base_api_url}/admin/plans`, data),
  getPlanesShow: (id) => axios.get(`${base_api_url}/admin/plans/${id}`),
  getPlanesUpdate: (data, id) =>
    axios.put(`${base_api_url}/admin/plans/${id}`, data),
  getPlanesDestroy: (id) => axios.delete(`${base_api_url}/admin/plans/${id}`),

  getSubscriptionsAll: (params) =>
    axios.get(`${base_api_url}/user/subscriptions`, { params }),
  getSubscriptionShow: (id) =>
    axios.get(`${base_api_url}/user/subscriptions/${id}`),
  createSubscription: (data) =>
    axios.post(`${base_api_url}/admin/subscriptions`, data),
  updateSubscription: (data, id) =>
    axios.put(`${base_api_url}/admin/subscriptions/${id}`, data),
  deleteSubscription: (id) =>
    axios.delete(`${base_api_url}/admin/subscriptions/${id}`),

  //Rutas públicas:
  // Universidades
  getUniversities: (data) =>
    axios.get(`${base_api_url}/public/universities/${data}`),
  getUniversityBySlug: (slug) =>
    axios.get(`${base_api_url}/public/universities/${slug}`),

  // Carreras
  getCareers: (quantity) =>
    axios.get(`${base_api_url}/public/careers/${quantity}`),
  getCareerBySlug: (slug) =>
    axios.get(`${base_api_url}/public/careers/${slug}`),

  // Cursos
  getCourses: (quantity = 120, params = {}) =>
    axios.get(`${base_api_url}/public/courses`, {
      params: { quantity, ...params },
    }),
  getCourseBySlug: (slug) =>
    axios.get(`${base_api_url}/public/courses/${slug}`),

  // Learning Paths (Rutas de Aprendizaje)
  getLearningPaths: (quantity = 120, params = {}) =>
    axios.get(`${base_api_url}/public/learning-paths`, {
      params: { quantity, ...params },
    }),
  getLearningPathBySlug: (slug) =>
    axios.get(`${base_api_url}/public/learning-paths/${slug}`),

  // Planes
  getPlans: (quantity = 4, params = {}) =>
    axios.get(`${base_api_url}/public/plans`, {
      params: { quantity, ...params },
    }),

  getPlanBySlug: (slug) => axios.get(`${base_api_url}/public/plans/${slug}`),

  // TESTS (público)
  getActiveTests: () => axios.get(`${base_api_url}/public/tests/active`),
  getTests: () => axios.get(`${base_api_url}/public/tests`),
  getTestById: (id) => axios.get(`${base_api_url}/public/tests/${id}`),
  getQuestions: (params = {}) =>
    axios.get(`${base_api_url}/public/questions`, { params }),
  getAnswerOptions: (params = {}) =>
    axios.get(`${base_api_url}/public/answer-options`, { params }),

  // TEST ATTEMPTS (privado)
  createTestAttempt: (data) =>
    axios.post(`${base_api_url}/user/test-attempts`, data),
  getMyTestAttempts: () => axios.get(`${base_api_url}/user/test-attempts`),
  getTestAttempt: (id) => axios.get(`${base_api_url}/user/test-attempts/${id}`),
  answerAttempt: (id, data) =>
    axios.post(`${base_api_url}/user/test-attempts/${id}/answer`, data),
  finishAttempt: (id) =>
    axios.post(`${base_api_url}/user/test-attempts/${id}/finish`),

  // RECOMMENDATIONS (privado)
  getAttemptRecommendations: (id) =>
    axios.get(`${base_api_url}/user/test-attempts/${id}/recommendations`),

  // ========================================
  // 🎯 DAILY EXERCISES (privado)
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
  getUserStreak: () => 
    axios.get(`${base_api_url}/user/streak`),

  /**
   * Obtener historial de ejercicios completados
   * @param {Object} params - Parámetros de filtrado opcionales
   * @returns {Promise} Lista de ejercicios completados
   */
  getUserExerciseHistory: (params = {}) =>
    axios.get(`${base_api_url}/user/daily-exercise/history`, { params }),

  // ========================================
  // 🔧 ADMIN - DAILY EXERCISES
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

  // ========================================
  // 📊 DASHBOARD DE PROGRESO
  // ========================================
  
  /**
   * Obtener resumen general del usuario
   * @returns {Promise} Estadísticas generales (cursos, tiempo, ejercicios, racha)
   */
  getDashboardOverview: () => 
    axios.get(`${base_api_url}/user/dashboard/overview`),

  /**
   * Obtener heatmap de actividad (últimos 12 meses)
   * @returns {Promise} Datos de actividad diaria tipo GitHub
   */
  getDashboardHeatmap: () => 
    axios.get(`${base_api_url}/user/dashboard/heatmap`),

  /**
   * Obtener progreso de cursos
   * @returns {Promise} Lista de cursos con % de avance y tiempo estimado
   */
  getDashboardCoursesProgress: () => 
    axios.get(`${base_api_url}/user/dashboard/courses-progress`),

  /**
   * Obtener estadísticas por categoría/carrera
   * @returns {Promise} Tiempo y cursos por categoría
   */
  getDashboardStatsByCategory: () => 
    axios.get(`${base_api_url}/user/dashboard/stats-by-category`),

  /**
   * Comparación con otros usuarios (anónima)
   * @returns {Promise} Percentil y ranking del usuario
   */
  getDashboardComparison: () => 
    axios.get(`${base_api_url}/user/dashboard/comparison`),
};