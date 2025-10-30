import axios from "axios";

const base_api_url = (import.meta?.env?.VITE_API_BASE_URL || "https://miback-14.onrender.com/api/v1").trim();
///Route

export default {
  //Rutas privadas:

  // Login con Google
  getMe: () => axios.get(`${base_api_url}/auth/me`),

  // AUTH
  getRegister: (data) => axios.post(`${base_api_url}/auth/register`, data),
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: (data) => axios.post(`${base_api_url}/auth/logout`, data),

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
      params: { quantity, ...params }, // <- correcto
    }),
  getCourseBySlug: (slug) =>
    axios.get(`${base_api_url}/public/courses/${slug}`),

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
};
