import axios from "axios";

const base_api_url = (import.meta?.env?.VITE_API_BASE_URL || "https://miback-1333.onrender.com/api/v1").trim();

// 🔥 INTERCEPTOR MEJORADO - Mejor manejo del token
axios.interceptors.request.use(
  (config) => {
    // Intentar obtener el token de sessionStorage o localStorage
    let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
    console.log("🔑 Token original:", token ? token.substring(0, 50) + "..." : "NO HAY TOKEN");
    
    // Si el token está en formato JSON, parsearlo
    if (token) {
      try {
        // Verificar si el token está envuelto en JSON
        if (token.startsWith('{') || token.startsWith('"')) {
          const parsed = JSON.parse(token);
          // Si es un objeto, buscar la propiedad token
          if (typeof parsed === 'object' && parsed.token) {
            token = parsed.token;
          } else if (typeof parsed === 'string') {
            token = parsed;
          }
        }
        
        // Limpiar comillas si las tiene
        token = token.replace(/^["']|["']$/g, '');
        
        console.log("🔑 Token limpio:", token.substring(0, 50) + "...");
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ Header Authorization configurado");
      } catch (e) {
        console.error("❌ Error parseando token:", e);
        // Intentar usar el token tal cual
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.warn("⚠️ No se encontró token en storage");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔥 INTERCEPTOR DE RESPUESTA - Capturar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("❌ Error 401: No autenticado - Redirigiendo al login");
      // Limpiar storage
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      // Redirigir al login
      window.location.href = '/login';
    }
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
  
  getTodayExercise: () => 
    axios.get(`${base_api_url}/user/daily-exercise/today`),

  submitExerciseAnswer: (data) =>
    axios.post(`${base_api_url}/user/daily-exercise/submit`, data),

  getUserStreak: () => 
    axios.get(`${base_api_url}/user/streak`),

  getUserExerciseHistory: (params = {}) =>
    axios.get(`${base_api_url}/user/daily-exercise/history`, { params }),

  // ========================================
  // 🔧 ADMIN - DAILY EXERCISES
  // ========================================
  
  getExercisesAll: (params = {}) => 
    axios.get(`${base_api_url}/admin/daily-exercises`, { params }),

  createExercise: (data) =>
    axios.post(`${base_api_url}/admin/daily-exercises`, data),

  getExerciseById: (id) =>
    axios.get(`${base_api_url}/admin/daily-exercises/${id}`),

  updateExercise: (id, data) =>
    axios.put(`${base_api_url}/admin/daily-exercises/${id}`, data),

  deleteExercise: (id) =>
    axios.delete(`${base_api_url}/admin/daily-exercises/${id}`),
};
