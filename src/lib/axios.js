import axios from "./lib/axios";

// ❌ ELIMINA ESTO - Ya no lo necesitas porque axios ya tiene el baseURL
// const base_api_url = "https://miback-1333.onrender.com/api/v1";

const Auth = {
  register: (data) => axios.post("/auth/register", data),
  login: (data) => axios.post("/auth/login", data),
  logout: () => axios.post("/auth/logout"),
  me: () => axios.get("/auth/me"),
};

const AdminUsers = {
  getAll: () => axios.get("/admin/users"),
  getById: (id) => axios.get(`/admin/users/${id}`),
  update: (id, data) => axios.put(`/admin/users/${id}`, data),
  delete: (id) => axios.delete(`/admin/users/${id}`),
};

const AdminUniversities = {
  getAll: () => axios.get("/admin/universities"),
  create: (data) => axios.post("/admin/universities", data),
  getById: (id) => axios.get(`/admin/universities/${id}`),
  update: (id, data) => axios.put(`/admin/universities/${id}`, data),
  delete: (id) => axios.delete(`/admin/universities/${id}`),
};

const AdminCareers = {
  getAll: () => axios.get("/admin/careers"),
  create: (data) => axios.post("/admin/careers", data),
  getById: (id) => axios.get(`/admin/careers/${id}`),
  update: (id, data) => axios.put(`/admin/careers/${id}`, data),
  delete: (id) => axios.delete(`/admin/careers/${id}`),
};

const AdminCourses = {
  getAll: () => axios.get("/admin/courses"),
  create: (data) => axios.post("/admin/courses", data),
  getById: (id) => axios.get(`/admin/courses/${id}`),
  update: (id, data) => axios.put(`/admin/courses/${id}`, data),
  delete: (id) => axios.delete(`/admin/courses/${id}`),
};

const AdminPlans = {
  getAll: () => axios.get("/admin/plans"),
  create: (data) => axios.post("/admin/plans", data),
  getById: (id) => axios.get(`/admin/plans/${id}`),
  update: (id, data) => axios.put(`/admin/plans/${id}`, data),
  delete: (id) => axios.delete(`/admin/plans/${id}`),
};

const AdminSubscriptions = {
  getAll: (params) => axios.get("/user/subscriptions", { params }),
  getById: (id) => axios.get(`/user/subscriptions/${id}`),
  create: (data) => axios.post("/admin/subscriptions", data),
  update: (id, data) => axios.put(`/admin/subscriptions/${id}`, data),
  delete: (id) => axios.delete(`/admin/subscriptions/${id}`),
};

const PublicUniversities = {
  getAll: (quantity) => axios.get(`/public/universities/${quantity}`),
  getBySlug: (slug) => axios.get(`/public/universities/${slug}`),
};

const PublicCareers = {
  getAll: (quantity) => axios.get(`/public/careers/${quantity}`),
  getBySlug: (slug) => axios.get(`/public/careers/${slug}`),
};

const PublicCourses = {
  getAll: (quantity = 120, params = {}) =>
    axios.get("/public/courses", {
      params: { quantity, ...params },
    }),
  getBySlug: (slug) => axios.get(`/public/courses/${slug}`),
};

const PublicPlans = {
  getAll: (quantity = 4, params = {}) =>
    axios.get("/public/plans", {
      params: { quantity, ...params },
    }),
  getBySlug: (slug) => axios.get(`/public/plans/${slug}`),
};

const PublicTests = {
  getActive: () => axios.get("/public/tests/active"),
  getAll: () => axios.get("/public/tests"),
  getById: (id) => axios.get(`/public/tests/${id}`),
  getQuestions: (params = {}) => axios.get("/public/questions", { params }),
  getAnswerOptions: (params = {}) => axios.get("/public/answer-options", { params }),
};

const TestAttempts = {
  create: (data) => axios.post("/user/test-attempts", data),
  getMy: () => axios.get("/user/test-attempts"),
  getById: (id) => axios.get(`/user/test-attempts/${id}`),
  answer: (id, data) => axios.post(`/user/test-attempts/${id}/answer`, data),
  finish: (id) => axios.post(`/user/test-attempts/${id}/finish`),
  getRecommendations: (id) => axios.get(`/user/test-attempts/${id}/recommendations`),
};

const Favorites = {
  getAll: (params = {}) => axios.get("/favorites", { params }),
  toggle: (payload) => axios.post("/favorites", payload),
};

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

const DailyExercises = {
  getToday: () => axios.get("/user/daily-exercise/today"),
  submit: (data) => axios.post("/user/daily-exercise/submit", data),
  getHistory: (params = {}) => axios.get("/user/daily-exercise/history", { params }),
  getStreak: () => axios.get("/user/streak"),
  // Admin
  getAll: (params = {}) => axios.get("/admin/daily-exercises", { params }),
  create: (data) => axios.post("/admin/daily-exercises", data),
  getById: (id) => axios.get(`/admin/daily-exercises/${id}`),
  update: (id, data) => axios.put(`/admin/daily-exercises/${id}`, data),
  delete: (id) => axios.delete(`/admin/daily-exercises/${id}`),
};

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
  getUniversidadesAll: AdminUniversities.getAll,
  getUniversidadesStore: AdminUniversities.create,
  getUniversidadesById: AdminUniversities.getById,
  getUniversidadesUpdate: (data, id) => AdminUniversities.update(id, data),
  getUniversidadesDeleteById: AdminUniversities.delete,

  // Admin Careers
  getCarrerasAll: AdminCareers.getAll,
  getCarrerasStore: AdminCareers.create,
  getCarrerasShow: AdminCareers.getById,
  getCarrerasUpdate: (data, id) => AdminCareers.update(id, data),
  getCarrerasDestroy: AdminCareers.delete,

  // Admin Courses
  getCursosAll: AdminCourses.getAll,
  getCursosStore: AdminCourses.create,
  getCursosShow: AdminCourses.getById,
  getCursosUpdate: (data, id) => AdminCourses.update(id, data),
  getCursosDestroy: AdminCourses.delete,

  // Admin Plans
  getPlanesAll: AdminPlans.getAll,
  getPlanesStore: AdminPlans.create,
  getPlanesShow: AdminPlans.getById,
  getPlanesUpdate: (data, id) => AdminPlans.update(id, data),
  getPlanesDestroy: AdminPlans.delete,

  // Admin Subscriptions
  getSubscriptionsAll: AdminSubscriptions.getAll,
  getSubscriptionShow: AdminSubscriptions.getById,
  createSubscription: AdminSubscriptions.create,
  updateSubscription: (data, id) => AdminSubscriptions.update(id, data),
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

  // Daily Exercises
  getTodayExercise: DailyExercises.getToday,
  submitExerciseAnswer: DailyExercises.submit,
  getUserStreak: DailyExercises.getStreak,
  getUserExerciseHistory: DailyExercises.getHistory,
  getExercisesAll: DailyExercises.getAll,
  createExercise: DailyExercises.create,
  getExerciseById: DailyExercises.getById,
  updateExercise: (id, data) => DailyExercises.update(id, data),
  deleteExercise: DailyExercises.delete,

  // Learning Paths
  getLearningPaths: PublicLearningPaths.getAll,
  getLearningPathBySlug: PublicLearningPaths.getBySlug,
  getAdminLearningPaths: AdminLearningPaths.getAll,
  createLearningPath: AdminLearningPaths.create,
  getAdminLearningPathById: AdminLearningPaths.getById,
  updateLearningPath: (data, id) => AdminLearningPaths.update(id, data),
  deleteLearningPath: AdminLearningPaths.delete,
};

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
};
