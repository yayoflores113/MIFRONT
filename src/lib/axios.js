import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  timeout: 60000,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axios.interceptors.response.use(null, (err) => {
  const error = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null
  };
  
  switch (err.response?.status) {
    case 402:
      for (let field in err.response.data.errors) {
        error.validation[field] = err.response.data.errors[field][0];
      }
      break;
      case 403:
        error.message = "You're not allowed to do that.";
        break;
        case 401:
          error.message = "Please re-login.";
          break;
          case 419:
            error.message = "CSRF token mismatch. Refresca e inténtalo de nuevo.";
            break;
            case 500:
              error.message = "Something went really wrong. Sorry.";
              break;
              default:
                error.message = "Something went wrong, please try again later.";
              }
              
              return Promise.reject(error);
            });
            
            
            window.axios = axios;
            axios.defaults.withCredentials = true;
            window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            
            // Añade el Bearer token automáticamente en cada request
            axios.interceptors.request.use((config) => {
              const token = localStorage.getItem('auth_token');
              if (token) config.headers.Authorization = `Bearer ${token}`;
              return config;
            });
export default axios;        